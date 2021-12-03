import React from "react";

export interface IBaseItemProps {
    index:number
    num:number

    data:any

    useUpdate:boolean
    useDelete:boolean

    onUpdate?:(data:any)=>void
    onDelete?:(data:any)=>void
    onReload?:()=>void

    onReloadItem?:()=>void

    didUpRecord?:(index:number,prev:any,current:any)=>void
}

export interface IBaseItemState {
    open:boolean
}

class Item<P extends IBaseItemProps,S extends IBaseItemState> extends React.Component<P,S>
{
    constructor(props:P)
    {
        super(props);
        this.gInitState=this.gInitState.bind(this);
        this.state=this.gInitState(props);

        this.onTgOpen=this.onTgOpen.bind(this);
        this.onReloadSelf=this.onReloadSelf.bind(this);
        this.rdrChild=this.rdrChild.bind(this);
    }

    protected gInitState(props?:P):S
    {
        props=props?props:this.props;
        return {
            open:false,
        } as S;
    }

    onTgOpen(e?:React.MouseEvent){
        if(e) e.preventDefault();
        this.setState({open:!this.state.open});
    }

    onReloadSelf()
    {

    }

    rdrChild():any
    {

    }
}


export {Item}