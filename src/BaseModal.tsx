import React,{CSSProperties, RefObject,ChangeEvent} from "react";
import {modal} from "intoy-modal";
import { isObjectEmpty } from "intoy-utils";
import { ajax, Iajax, IUploadProgress } from "intoy-xhr";
import { getConfigHeader, getDefaultBaseModalTitleInsert, getDefaultBaseModalTitleUpdate, handleAlertErrorBase } from "./baseConfig";
import {IBaseModalState, IBaseModalProps, IModalPromiseParameters} from "./types";

type IAnyEvent=ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>;

class BaseModal<P extends IBaseModalProps, S extends IBaseModalState> extends React.Component<P,S>
{
    protected prevData:any;
    protected data:any;
    protected classForm:string='modalForm';
    protected styleForm:CSSProperties;
    protected btnSaveText:string='Simpan';
    protected btnCancelText:string='Batal';
    protected useEfieldId:boolean=true;
    protected titleIns:string=getDefaultBaseModalTitleInsert();
    protected titleUpd:string=getDefaultBaseModalTitleUpdate();

    constructor(props:P){
        super(props);      
        this.styleForm={};
        this.hUploadProgress=this.hUploadProgress.bind(this);
        this.onSubmit=this.onSubmit.bind(this);   
        this.onCh=this.onCh.bind(this);
        this.onClSubmit=this.onClSubmit.bind(this);
        this.onSuccess=this.onSuccess.bind(this);
        this.prevData={...props.data};
        this.data={...props.data};   
        this.nodeForm=null;    
        this.state=this.gInitState();
    }

    protected gInitState():S 
    {
        return {loading:false,progress:null} as S;
    }

    protected nodeForm:RefObject<HTMLFormElement>|any

    protected getIncludeFields():string[]
    {
        return [];
    }

    getEditing(){
        return !isObjectEmpty(this.prevData);
    }    

    getSetup()
    {
        const editing=this.getEditing();
        const setup:Iajax=
        {
            url:(editing?this.props.url_update||"":this.props.url_insert||"") as string,
            method:"post",
            formElement:this.nodeForm,
            uploadProgress:this.hUploadProgress
        };

        if(editing){
            setup.params={};           
            if(this.useEfieldId)    
            {
                setup.params[this.props.fieldid]=this.prevData[this.props.fieldid];
            }
            setup.params[this.props.fieldid+'_lama']=this.prevData[this.props.fieldid];
        }

        const fields=this.getIncludeFields()||[];
        if(fields.length>0)
        {
            if(!setup.params)
            {
                setup.params={};
            }
            for(let i=0; i<fields.length; i++)
            {
                let val=this.data[fields[i]];
                if(val===null || val===undefined){
                    val=this.prevData[fields[i]];
                }
                if(val!==null && val!==undefined)
                {
                    setup.params[fields[i]]=val;
                }
            }
        }
        const headers=getConfigHeader();
        if (headers){
            setup.headers={...headers};
        }
        return setup;
    }

    protected hUploadProgress(prog:IUploadProgress)
    {
        this.setState({progress:prog?{...prog}:null});
    }

    protected onSuccess(data:any)
    {
         if(typeof this.props.onUpdate==="function") this.props.onUpdate(data);
         if(typeof this.props.onClose==="function") this.props.onClose();
    }


    onSubmit(e?:React.FormEvent<HTMLFormElement>){
        if(e) e.preventDefault();        

        this.setState({loading:true},()=>{
            const setup=this.getSetup();
            ajax(setup)
            .then(data=>{                
               this.onSuccess(data);
            })
            .catch(e=>{          
                this.setState({loading:false,progress:null});               
                handleAlertErrorBase(e);
            });
        });
    }

    onCh(e:IAnyEvent){
        this.data[e.target.name]=e.target.value;
        this.forceUpdate();
    }

    onClSubmit(e?:React.MouseEvent){
        if(e) e.preventDefault();
        this.onSubmit();
    }

    rdrTitle():any
    {           
        const {loading}=this.state;
        return (
            <div className="windowTitle">                 
                <div className="auto">
                    {this.getEditing()?this.titleUpd+" ":this.titleIns+" "}{this.props.formTitle ? this.props.formTitle : 'Data'}
                </div>
                <div>
                    {!loading && <a className="close" onClick={this.props.onClose}>&#x2716;</a>}
                </div>
            </div>
        );        
    }

    rdrActions():React.ReactNode | null | undefined
    {
        const {loading}=this.state;        
        return (
            <div className="windowAction">
                {loading && <button type="button" className={"btn"}>Mengirim... <i className="fa fa-spin fa-spinner"/></button>}
                {!loading && <button type="submit" className={"btn btn-outline-primary"} onClick={this.onClSubmit}><i className="fa fa-save" /> {this.btnSaveText} </button>}
                {!loading && <button type="button" className={"btn btn-outline-danger"} onClick={this.props.onClose} ><i className="fa fa-remove" /> {this.btnCancelText}</button>}
            </div>
        )
    }

    rdrContent(){
        const data=this.data||{} as any;
        return (
            <div className="windowContent">
                Use content this,....
            </div>
        )
    }    

    render():React.ReactNode
    {     
        const {loading,progress}=this.state;
        const st1:CSSProperties={
            position:"relative",
        };         
        return (
            <form ref={fn=>this.nodeForm=fn} className={`${this.classForm?this.classForm:``}`} onSubmit={this.onSubmit} style={this.styleForm}>
                <div className="wrap" style={st1}>
                    {this.rdrTitle()}
                    {this.rdrContent()}
                    {this.rdrActions()}
                    {loading && 
                    <div style={
                        {
                            position:"absolute",
                            width:"100%",
                            height:"100%",
                            overflow:"hidden",
                            display:"flex",
                            alignItems:"flex-end",
                            justifyContent:"center",
                            left:"0",
                            top:"0",
                            zIndex:2
                        }                        
                    }>
                        {progress && 
                            <div className='relative w-2/3 gap-1'
                                style={{
                                    position:'relative',
                                    marginBottom:"12.5%",
                                    width:'75%',
                                    display:'grid',
                                    gap:'0.5rem',
                                }}
                                >
                                <div className="flex justify-between text-xs"
                                    style={{
                                        display:'flex',
                                        justifyContent:'space-between',
                                        fontSize:'0.75rem',
                                    }}
                                    >
                                    <div>{progress.percentage.toFixed(2)}%</div>
                                    <div>100%</div>
                                </div>
                                <div className="relative h-2 border rounded overflow-hidden bg-white border-blue-500"
                                    style={{
                                        position:'relative',
                                        border:'solid 1px #3B82F6',
                                        backgroundColor:'white',
                                        overflow:'hidden',
                                        borderRadius:'0.25rem'
                                    }}
                                    >
                                    <div className="bg-blue-500" style={{
                                        position:"absolute",
                                        left:0,
                                        top:0,
                                        height:"100%",
                                        transition:"all 274ms ease-in-out",
                                        backgroundColor:'#3B82F6',
                                        width:`${progress.percentage}%`,
                                    }}/>
                                </div>
                            </div>
                        }
                    </div>
                    }
                </div>
            </form>
        )
    }
}

export {BaseModal};


export function createModalPromise({
    component,
    url_insert,
    url_update,
    formTitle,
    data,
    fieldid="id",
    ...any
}:IModalPromiseParameters){    
    return new Promise((resolve)=>
    {
        modal({
            component:component?component:BaseModal,
            props:{
                data:data,
                formTitle:formTitle,
                url_insert: url_insert,   
                url_update:url_update,      
                fieldid:fieldid,       
                ...any,
                onUpdate:function(newData:any){
                    resolve(newData);
                }
            }
        });
    });
};