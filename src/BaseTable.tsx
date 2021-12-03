import React from "react";
import { toStr, toUcWords } from "intoy-utils";
import {
    IBaseTableProps,
    IBaseSetupTable,  
    IBaseField,  
} from "./types"

export function generateFromSetupTable(table:IBaseSetupTable){
    const n:any={...table};
    n.table_head=[];
    n.table_row=[];

    if(n.fields && Array.isArray(n.fields) && n.fields.length>0){
        for(let i=0; i<n.fields.length; i++){
            const o=n.fields[i]||{};
            let field="";
            if(o.alias){
                field=o.alias;
            }
            else {
                field=toUcWords(o.f);
            }
            field=toStr(field);
            if(field.length>0){
                n.table_head.push(field);
                n.table_row.push({...o,f:o.f,cb:o.cb});
            }
        }
    }
    return n;
}

export class BaseTable extends React.Component<IBaseTableProps>{
    constructor(props:IBaseTableProps){
        super(props);
        this.table=generateFromSetupTable(props.table||{} as any);
    }

    table:any;

    render(){    
        const table_head=this.table.table_head||[];
        const table_row=this.table.table_row||[];
        const list=this.props.records||[];
        let startNum=0;
        const use=this.props.useUpdate||this.props.useDelete;
        return (
            <div className="base-data-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="deep">No</th>
                            {table_head.map((f:any,fidx:number)=>{
                                return (
                                    <th key={fidx}>{f}</th>
                                )
                            })}
                            {use && <th className="deep noprint"><i className="fa fa-gear"/></th>}
                        </tr>
                    </thead>
                    <tbody>    
                        {list.map((r:any,idx:number)=>{
                            startNum++;
                            return (
                                <tr key={idx}>
                                    <td className="deep" align="center">{startNum}</td>
                                    {table_row.map((f:IBaseField, fidx:number) => {                                    
                                        let val=r[f.f];
                                        //console.log("f ",f);
                                        if(typeof f.cb==="function"){                                        
                                            try{
                                                val=f.cb(r[f.f],r);
                                            }
                                            catch(e){
                                                //console.log(e.message);
                                            }
                                        }
                                        const tdProps:any={};
                                        if(f.align){
                                            tdProps.align=f.align;
                                        }
                                        if(f.style){
                                            tdProps.style=f.style;
                                        }
                                        if(f.className)
                                        {
                                            tdProps.className=f.className;
                                        }

                                        return (
                                            <td key={fidx} {...tdProps} >{val}</td>
                                        );
                                    })}
                                    {use && 
                                    <td className="deep noprint">
                                        <div className="base-actions">
                                            <a onClick={e=>{e.preventDefault(); this.props.onUpdate?this.props.onUpdate(r):null;}} className="btn btn-outline-secondary btn-sm"><i className="fa fa-pencil" /></a>
                                            <a onClick={e=>{e.preventDefault(); this.props.onDelete?this.props.onDelete(r):null;}} className="btn btn-outline-danger btn-sm"><i className="fa fa-trash-o" /></a>
                                        </div>
                                    </td>
                                    }
                                </tr>
                            )
                        })}                
                    </tbody>
                </table>
            </div>
        )
    }
}