import React, { ReactNode } from "react";
import { LoadingOverlay, AlertExclam } from "intoy-modal"
import { isEqual, rTrim, toInt, toStr, toUcWords} from "intoy-utils";
import { ajax, Iajax } from "intoy-xhr";
import { getConfigHeader, getDefaultDeleteRequestType, handleAlertErrorBase } from "./baseConfig";
import {    
    IBaseProps,    
    IBaseSearch,
    IBaseState,
    IBaseSetupTable,
    IBasePagProps,
    IBaseOptionSearchArrayObject,
    IBaseRequest,
    IBaseResponse,
    IBaseDeleteRequestType
} from "./types";


export class Base<P extends IBaseProps, S extends IBaseState> extends React.Component<P,S> 
{    
    protected lodOv:LoadingOverlay<any>|null;

    protected search:IBaseSearch;    
    protected records:any;   
    protected req:IBaseRequest;
    protected res:IBaseResponse; 

    //informasi field yang ditampilkan ketika akan dihapus
    protected asgFieldShow:number;

    /// apakah harus force update ketika ada record yang diupdate
    protected updOnDidUpRecord:boolean=false;
    // apakah data harus dihapus ketika loaded tidak berhasil
    protected clrDataOnFailed:boolean=false;

    // jenis request delete
    protected delReqTipe:IBaseDeleteRequestType=getDefaultDeleteRequestType();

    constructor(props:P){        
        super(props);
        this.lodOv=null;

        this.onSearch=this.onSearch.bind(this);
        
        this.doReload=this.doReload.bind(this);
        this.onReload=this.onReload.bind(this);

        this.onInsert=this.onInsert.bind(this);
        this.onUpdate=this.onUpdate.bind(this);
        this.onDelete=this.onDelete.bind(this);

        this.onAftInsert=this.onAftInsert.bind(this);
        this.onAftUpdate=this.onAftUpdate.bind(this);
        this.onAftDelete=this.onAftDelete.bind(this);

        this.doSndDelete=this.doSndDelete.bind(this);
        this.onSetPage=this.onSetPage.bind(this);

        this.didUpRecord=this.didUpRecord.bind(this);
        this.onItemBeforeUpdate = this.onItemBeforeUpdate.bind(this);
        this.onItemUpdated=this.onItemUpdated.bind(this);
        this.didUpList=this.didUpList.bind(this);

        this.handResp=this.handResp.bind(this);
        this.handSort=this.handSort.bind(this);
        this.handRespAft=this.handRespAft.bind(this);

        this.rdrChilds=this.rdrChilds.bind(this);
        this.rdrFind=this.rdrFind.bind(this);
        this.rdrTable=this.rdrTable.bind(this);
        this.rdrPag=this.rdrPag.bind(this);        
        
        this.search={
            search:typeof props.search==="number" || typeof props.search==="string"?props.search.toString():"",           
        };      

        this.asgFieldShow=2;
        
        this.records=[];
        this.req={
            page:1,
            limit:props.limit?props.limit:20,
            search:{},
        } as IBaseRequest;

        this.res={
            limit:this.req.limit,
            page:1,
            pagecount:1,
            rowcount:0,
            totalrow:0,
            records:[],
        } as IBaseResponse;         
        
        this.state=this.gInitState(props);

    }

    protected gInitState(props?:P):S
    {
        return {loadedCount:0,loading:false,error:null} as S;
    }

    protected ovOpen(ops?:any)
    {
        if(this.lodOv)
        {
            if(ops && ops.text)            
            {
                this.lodOv.setText(ops.text);
            }
            return;
        }
        this.lodOv=new LoadingOverlay({clickClose:false,...ops});
        this.lodOv.open();
    }

    protected ovClose()
    {
        if(!this.lodOv) return;
        this.lodOv.destroy();
        this.lodOv=null;
    }

    protected getIndexArrayObj(props:IBaseOptionSearchArrayObject)
    {

        const po=props?props:{} as IBaseOptionSearchArrayObject; 
        let index=-1;
        let p=toStr(po.field).toString().trim();
        if(!Array.isArray(po.arrayObj) || p.length<1) return index;
        let val=toStr(po.value).toString().trim();
        if(!po.sensitive){
            val=val.toUpperCase();
        }
        for(let i=0; i<po.arrayObj.length; i++){
            const o:any=po.arrayObj[i] as any;
            const iso=typeof o==="object" && !Array.isArray(o);
            if(!iso) continue;

            let b=toStr(o[po.field]).toString().trim();
            if(!po.sensitive){
                b=b.toUpperCase().trim();
            }
            if(val===b){
                index=i;
                break;
            }
        }
        return index;
    }

    //ketika hanya satu record yang harus diupdate    
    protected didUpRecord(index:number,prevData:any,current:any)
    {   
        const isTrue=index>=0 && current && Array.isArray(this.records) && this.records.length>0 && index<=this.records.length-1;        
        if(isTrue)
        {
            this.records[index]={...current};
            this.onItemUpdated();
            //you must re render for update childs record for graduaded  
            if(this.updOnDidUpRecord)
            {
                this.forceUpdate();
            }
        }
    }

    // ketika salah satu item record akan di bind ke array records
    protected onItemBeforeUpdate(item:any)
    {

    }

    // ketika salah satu di item records di update
    protected onItemUpdated()
    {

    }

    //ketika harus meload kembali ketika ada proses submit form insert/update/delete berhasil
    protected didUpList()
    {

    }

    protected handResp(res:any)
    {   
        if(res && res.records && Array.isArray(res.records))
        {
            //copy response
            this.res={...res};
            this.res.records=res.records.slice(0);
            this.res.page=this.res.page!==undefined && this.res.page!==null?this.res.page:1;
            this.res.pagecount=this.res.pagecount!==undefined && this.res.pagecount!==null?this.res.pagecount:1;
            this.res.totalrow=this.res.totalrow===undefined || this.res.totalrow===null?this.res.records.length:this.res.totalrow;
            this.res.rowcount=this.res.rowcount===undefined || this.res.rowcount===null?this.res.records.length:this.res.rowcount;
            //normalize response
            this.res.limit=res.limit!==undefined && res.limit!==null?res.limit:this.req.limit;
            this.res.page=this.res.page<1?1:this.res.page;
            this.res.pagecount=this.res.pagecount<1?1:this.res.pagecount;
            this.res.totalrow=this.res.totalrow<0?0:this.res.totalrow;
            this.res.rowcount=this.res.rowcount<0?0:this.res.rowcount;
            this.res.rowcount=this.res.rowcount>this.res.totalrow?this.res.totalrow:this.res.rowcount;
            this.records=this.res.records.slice(0);
            // delete res response records
            this.res.records=[];
        }
        else 
        if(Array.isArray(res))
        {
            //attach res as records
            this.records=res.slice(0);
            this.res.page=1;
            this.res.pagecount=1;
            this.res.totalrow=this.records.length;
            this.res.rowcount=this.res.rowcount;
        }
        else {
            //reset data
            this.records=[];
            this.res.page=1;
            this.res.pagecount=1;
            this.res.totalrow=0;
            this.res.rowcount=0;
        }       
    }

    protected handSort()
    {
        const isTrue=Array.isArray(this.records) && this.records.length>0
                    && this.props.table 
                    && this.props.table.sortField!==undefined
                    && this.props.table.sortField!==null
                    ;
        if(!isTrue) return;

        const f=this.props.table.sortField||"index";
        const st=this.props.table.sortFieldType||"string";
        this.records.sort((a:any,b:any)=>{
            let valA:any=a[f];
            let valB:any=b[f];
            if(["integer","double"].indexOf(st)>=0)
            {
                valA=parseFloat(valA);
                valB=parseFloat(valB);
            }            
            return valA>valB?1:valA<valB?-1:0;
        })
    }

    protected handFilter()
    {

    }

    protected handRespAft()
    {
        this.setState({loadedCount:this.state.loadedCount+1,loading:false,error:null});
    }
    
    protected getSetup(params?:any):Iajax
    {
        const setup:Iajax={
            url:this.props.url_data?this.props.url_data.toString().trim():"",
        }
        if(params)
        {
            setup.params={...params};
        }

        const headers=getConfigHeader();
        
        if(headers){
            setup.headers={...headers};
        }
        return setup;
    }

    doReload()
    {      
        const req={...this.req};
        if(this.res.pagecount>0 && req.page>this.res.pagecount)
        {
            req.page=this.res.pagecount;            
        }

        const setup=this.getSetup({
            ...req,
            ...this.search
        });

        const headers:any=getConfigHeader();
        
        if(headers){
            setup.headers={...headers};
        }
        
        ajax(setup)
        .then(data=>{ 
            this.handResp(data);
            this.handSort();
            this.handFilter();
            this.handRespAft();            
        })
        .catch(e=>{
            if(this.clrDataOnFailed)
            {
                this.records=[];
            }
            
            this.setState({loadedCount:this.state.loadedCount+1,loading:false});
        });
    }

    onReload()
    {   
        if(this.state.loading){
            console.warn("Base multiple calling reload at sometime");            
        }       
        this.setState({ loading: true },this.doReload);             
    }

    onSearch(newSearch:IBaseSearch){                
        if(!isEqual(this.search,newSearch)){                        
            this.search={...newSearch};
            //page harus direset karena terjadi perubahan permintaan keserver 
            this.req.page=1;
            this.onReload();
        }
    }    

    onAftInsert(newData:any)
    {
        this.didUpList();
        this.onReload();        
    }

    onInsert(){
        const callable=this.props.compForm;
        if(!callable) return;

        callable().then((newData:any) =>{
            this.onAftInsert(newData);
        });
    }

    onAftUpdate(newData:any)
    {
        this.didUpList();
        this.onReload();
    }

    onUpdate(data:any){
        const callable=this.props.compForm;
        if(!callable) return;
        callable({
            data:data
        }).then((newData:any)=>{
            this.onAftUpdate(newData);
        });
    }

    onAftDelete(data:any,fieldid:any,value:any)
    {
        let reloanOnDelete=this.props.reloadOnDeleted===true;
        let index=-1;
        if(!reloanOnDelete){
            index=this.getIndexArrayObj({
                arrayObj:this.records,
                field:fieldid,
                value:value,                
            });
        }
        
        if(index>=0 && !reloanOnDelete){
            //cancel reload splice record
            this.records.splice(index,1);
            if(this.records.length>0)
            {
                this.didUpList();
                this.forceUpdate();
                return;
            }
            reloanOnDelete=true;
        }        

        this.didUpList();
        this.onReload();
    }

    protected getMsgDel(data:any):string
    {
        if(!data) return "";

        const table:IBaseSetupTable=this.props.table||{} as IBaseSetupTable;
        const fieldid=table.fieldid;
        const d:any={};       
        
        let str="";
        let par=[];        
        let dataName="";
        if(fieldid){
            d[fieldid as string]=data[fieldid as string];
        }

        if(toStr(table.dataName).toString().trim().length>0){
            dataName=toStr(table.dataName).toString().trim();
        }
        
        if(table.fields && table.fields.length>0){
            for(let i=0; i<table.fields.length; i++){
                const f=table.fields[i];
                let val=toStr(data[f.f]);
                if(val.length>0){
                    if(val.length>50){
                        val=val.substring(0,50)+'..';
                    }
                    let fName:string=toStr(table.fields[i].alias);
                    let lval:string='<b>'+val+'</b>';
                    if(fName.length>0){
                        lval=fName+' '+lval;
                    }
                    par.push(lval);
                }
                if(par.length>=this.asgFieldShow) break;
            }
        }                 

        if(dataName.length>0) str+=toUcWords(dataName);    
        if(par.length>0){
            if(str.length>0){
                str+=" item";
            }
            else {
                str+="Item";
            }

            str+=" data "+par.join(", ")+"";
        }        
        str+=" akan dihapus.";
        return str;
    }


    protected getSetupDel(data:any):Iajax
    {
        const props=this.props;
        let url=this.props.url_delete?this.props.url_delete.toString().trim():"";
        let url_method="POST";

        const se:Iajax={
            url:url,
            params:data,
            method:url_method,
        };  

        const genreDefault=()=>{
            const table:IBaseSetupTable=this.props.table||{} as IBaseSetupTable;
            let fields:any=table.fieldid?table.fieldid:"";
            fields=Array.isArray(fields)?fields:[fields];
            const fieldNames:string[]=[];
            const values:string[]=[];
            const obj:any={};

            for(let i=0; i<fields.length; i++)
            {
                const f=toStr(fields[i]);
                let val=f.length>0?toStr(data[f]).toString().trim():'';
                if(val.length>0)
                {
                    fieldNames.push(f);
                    values.push(val);
                    obj[f]=val;
                }
            }        
            if(values.length>0)
            {
                //using delete 
                se.method='DELETE';
                se.url+="/"+values.join("/");
                delete se.params;
            }        
        
            const headers=getConfigHeader();

            if(headers){
                se.headers=headers;
            }
        };


        const genreQParams=()=>{
            let fields=props.table && props.table.fieldid?props.table.fieldid:null;
            if(typeof fields==='string')
            {
                fields=toStr(fields);
                fields=fields.length>0?[fields]:[];
            }
            else         
            {
                fields=Array.isArray(fields)?fields:[];
            }

            //const u=new URLSearchParams()   
            let url=rTrim(toStr(props.url_delete),'/'); 
            url+=url[url.length-1]!=='?'?'?':'';
            se.method='delete';
            se.params={};
            data=data||{};

            for(let i=0; i<fields.length; i++)
            {
                const p=fields[i];
                const val=toStr(data[p]).toString().trim();
                if(val.length>0)
                {
                    se.params[p]=val;
                }
            }

            const su=new URLSearchParams(se.params);
            delete se.params;        
            se.url=url+su.toString();
        };

        if(this.delReqTipe==="qparams")
        {
            genreQParams();
        }
        else {
            genreDefault();
        }

        return se;
    }

    protected doSndDelete(se:Iajax) 
    {        
        this.setState({loading:true},()=>
        {
            const table:IBaseSetupTable=this.props.table||{} as IBaseSetupTable;
            const fieldid=table.fieldid?table.fieldid:'';
            this.ovOpen({text:'Menghapus,..'});
            ajax(se)
            .then(info=>{
                this.ovClose();
                this.setState({loading:false},()=>{
                    this.onAftDelete(se.params,fieldid,info); 
                });
            })
            .catch(e=>{
                this.ovClose();
                handleAlertErrorBase(e); 
                this.setState({loading:false});
            });
        });
    }    

    onDelete(data:any)
    {
        let str=this.getMsgDel(data);

        let after="Terkait data dimaksud ada kemungkinan akan ikut terhapus. <br/>&nbsp;<br/>Apakah Anda setuju?";
        if((str+" "+after).length>100) str+="<br/>";
        else str+=" ";
        str+=after;        

        let str_no='<i class="fa fa-hand-stop-o"> </i> Tidak';
        let str_yes='<i class="fa fa-thumbs-o-up"> </i> Iya setuju hapus';
        AlertExclam("Konfirmasi Hapus",str,str_no,function noop(){},str_yes,()=>{
            const se=this.getSetupDel(data);            
            this.doSndDelete(se);
        });
    }

    onSetPage(page:number)
    {
        if(this.state.loading) return false;
        page=toInt(page);
        page=page<1?1:page;
        page=page>this.res.pagecount?this.res.pagecount:page;
        
        if(page!==this.res.page)
        {
            this.req.page=page;
            this.onReload();
        }
    }

    onSetLimit=(limit:number)=>{
        if(limit===undefined || limit===null || limit===this.req.limit) return;
        this.req.limit=limit;
        this.onReload();
    }

    getFndProps(){
        const props:any={
            useInsert:this.props.useInsert,
            search:{...this.search},
            onSearch:this.onSearch,
            onReload:this.onReload,
            onInsert:this.onInsert,
            onSetLimit:this.onSetLimit,
            limit:this.req.limit,
            loading:this.state.loading,
        };
        return props;
    }

    getTblProps(){
        const props={
            useUpdate:this.props.useUpdate,
            useDelete:this.props.useDelete,

            onUpdate:this.onUpdate,
            onDelete:this.onDelete,
            onReload:this.onReload,

            table:this.props.table,
            records:this.records,   
            
            page:this.res.page,
            limit:this.req.limit,
            loading:this.state.loading,         
        };        
        return props;
    }

    getPagProps():any
    {

        const props:IBasePagProps={
            page:this.res.page,
            pagecount:this.res.pagecount,
            rowcount:this.res.rowcount,
            limit:this.res.limit,
            totalrow:this.res.totalrow,
            onSetPage:this.onSetPage,
            dsLeft:true,
            dsRight:true,
        };
        return props;
    }

    rdrFind():ReactNode|any
    {
        const Comp=this.props.compFind;
        if(Comp){
            const props=this.getFndProps();                
            return <Comp {...props} />
        }
    }

    rdrTable():ReactNode|any
    {
        const Comp=this.props.compTbl;
        if(Comp){
            const props=this.getTblProps();
            return <Comp {...props} />
        }
    }

    rdrPag():ReactNode|any
    {
        if(this.res.pagecount<=1) 
        {            
            return null;
        }
        
        const Comp=this.props.compPag;
        if(Comp){
            const props=this.getPagProps();
            return <Comp {...props} />
        }
    }  

    rdrChilds():ReactNode | any
    {        
        const childs=[this.rdrFind(),this.rdrTable(),this.rdrPag()];
        return childs;
    }  

    render():ReactNode|any
    {     
        const {loading}=this.state;       
        return (
            <div className={"base"+(this.props.className?" "+this.props.className:"")+(loading?" loading":"")}>
               {this.rdrChilds()}       
            </div>
        )
    }

    componentDidMount()
    {        
        this.onReload();
    }
}