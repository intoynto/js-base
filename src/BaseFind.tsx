import React from "react";
import {   
    IBaseFindProps
    ,IBaseFindState  
} from "./types";

type IAnyEvent=React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>;


export class BaseFind<P extends IBaseFindProps, S extends IBaseFindState> extends React.Component<P,S> 
{    
    protected textInsert:string='';
    protected textReload:string='';
    protected textReloadIcon:string="fa-search";
    protected btnInsertClass:string;
    protected btnInsertIcon:any;

    constructor(props:P){
        super(props);      
        this.state=this.gInitState(props);   
        this.onCh=this.onCh.bind(this);  
        this.onChUpdate=this.onChUpdate.bind(this);
        this.onChLimit=this.onChLimit.bind(this);
        this.callPropsSearch=this.callPropsSearch.bind(this);
        this.hKeyPress=this.hKeyPress.bind(this);
        this.rdrApFind=this.rdrApFind.bind(this);

        this.btnInsertIcon=()=><i className="fa fa-plus-circle" />
        this.btnInsertClass="btn btn-outline-primary";
    }      
  
    protected gInitState(props?:P):S
    {        
        let state={
            search:{
                search:"",
            }
        };        
        if(props!==undefined && props!==null && props.search){
            state.search={...props.search};
        }        
        return state as S;
    }

    protected callPropsSearch(){
        if(typeof this.props.onSearch==="function"){
            this.props.onSearch(this.state.search);
        }
    }

    protected onCh(e:IAnyEvent){
        if(!e || !e.target || !e.target.name) return;                        
        const search:any=this.state.search || {} as any; 
        const value=e.currentTarget.value;
        search[e.currentTarget.name]=Array.isArray(value)?value.slice(0):value;                        
        this.setState({search:{...search}});
    }

    protected onChUpdate(e:IAnyEvent){
        if(!e || !e.target || !e.currentTarget.name) return;        
        //const {search}=this.state;
        const search:any=this.state.search || {} as any;
        const value=e.currentTarget.value;
        search[e.currentTarget.name]=Array.isArray(value)?value.slice(0):value;  ;             
        this.setState({search:{...search}},this.callPropsSearch);
    }

    protected onChLimit(e:IAnyEvent){
        let limit=e.target.value===""?20:parseInt(e.target.value); 
        if(isNaN(limit)) limit=0;
        const props:any=this.props||{} as any;
        let plimit=props.limit!==undefined && props.limit!==null?parseInt(props.limit):0;
        if(isNaN(plimit)) plimit=0;
        if(limit!==plimit && typeof this.props.onSetLimit==="function")
        {
            this.props.onSetLimit(limit);
        }
    }

    protected hKeyPress(e:React.KeyboardEvent<HTMLInputElement>){     
        if(e && e.key==="Enter"){
            this.callPropsSearch();
        }
    }

    protected rdrApFind():any
    {
        const props=this.props;
        const {loading}=props;
        const childs=[
            <button type="button" className="btn" onClick={e => { e.preventDefault();  if(this.props.loading) return; typeof this.props.onReload==='function'?this.props.onReload():null; }}><i className={"fa " + (this.props.loading ? "fa-spin fa-spinner" :this.textReloadIcon)} />{this.textReload?" "+this.textReload:""}</button>           
        ];
        if(props.useInsert)
        {
            childs.push(
                <button 
                    type="button" 
                    className={loading?'btn-outline-secondary':this.btnInsertClass} 
                    onClick={loading?undefined:this.props.onInsert}
                >
                    {!loading && <span>{this.btnInsertIcon?typeof this.btnInsertIcon==="function"?this.btnInsertIcon():this.btnInsertIcon:null}{this.textInsert?" "+this.textInsert:""}</span>}
                    {loading && <i className='fa fa-spin fa-spinner' />}
                </button>
            );
        }
        return childs;
    }

    render(){
        const data:any=this.state.search||{};                          
        return (
            <div className="base-find noprint">
                <div className="input-group">
                    <div className="input-group-element">
                        <input type="text" name="search" id="search" autoComplete="off" placeholder="Keyword" value={data.search} onChange={this.onCh} onKeyPress={this.hKeyPress} spellCheck="false" />
                    </div>
                    <div className="input-group-append">
                        {this.rdrApFind()}
                    </div>
                </div> 
            </div>      
        )
    }
}