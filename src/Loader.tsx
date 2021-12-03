import React from "react";
import { ajax, Iajax } from "intoy-xhr";
import { getConfigHeader } from "./baseConfig";

export interface IBaseLoaderProps {
    url?:string
    params?:any
    method?:string
}

export interface IBaseLoaderState {
    loading:boolean
    error:any
}

class BaseLoader<P extends IBaseLoaderProps, S extends IBaseLoaderState> extends React.Component<P,S>
{
    protected res:any
    constructor(props:P)
    {
        super(props);
        this.res=null;
        this.doLoad=this.doLoad.bind(this);
        this.onReload=this.onReload.bind(this);
    }

    protected getStp():Iajax
    {
        const se:Iajax={
            url:(this.props.url??'') as string,
            params:this.props.params,
            method:(this.props.method??'GET'),
            headers:getConfigHeader(),
        }    
        return se;
    }

    protected doLoad()
    {
        const se:Iajax=this.getStp();
        ajax(se)
        .then((n:any)=>{
            this.res={...n};
            this.setState({loading:false,error:null});
        })
        .catch(e=>{
            this.res=null;
            this.setState({loading:false,error:e});
        });
    }

    protected onReload(e?:React.MouseEvent)
    {
        if(e) e.preventDefault();
        this.setState({loading:false,error:null},this.doLoad);
    }

    componentDidMount()
    {
        if(this.props.url && this.props.url.length>0) this.onReload();
    }
}

export {BaseLoader}