import React from "react";
import {toInt,toDashVal} from "intoy-utils";
import {IBasePagProps,IBasePageInfoParams,IBasePageInfo} from "./types";

const step=(page:number,className:string,cb?:Function)=>{
    return <a title={"kehalaman "+page} onClick={(e:React.MouseEvent)=>{e.preventDefault();cb?cb(page):null}}><span className={className}/></a>
};

const activePage=(page:number,curentPage:number,cb?:Function)=>{
    let ncb=curentPage!==page?cb:null;
    let classActive=curentPage===page?"active aktif":"";
    return <a className={"step "+classActive} onClick={(e)=>{e.preventDefault(); ncb?ncb(page):null;}}><span>{page}</span></a>;
};



interface IInfo {
    page:string | number
    limit:string | number
    rowcount:string | number
    totalrow:string | number
}

const Info=({page,limit,rowcount,totalrow}:IInfo)=>{
    page=toInt(page);
    rowcount=toInt(rowcount);
    totalrow=toInt(totalrow);
    limit=toInt(limit);
    page=page<1?1:page;
    let start=((page - 1) * limit)+1;
    let stop=(start + limit) - 1;
    stop=stop>totalrow?totalrow:stop;

    //pageInfo=Math.min(rowcount,pageInfo);
    return (
        <div className="info"><b>{start}</b>-<b>{stop}</b>{totalrow>0 && <span> / <b>{toDashVal(totalrow)}</b></span>}</div>
    );
}

export function generatePageInfo({page,pagecount,range}:IBasePageInfoParams):IBasePageInfo
{
    page=toInt(page);
    pagecount=toInt(pagecount);
    range=toInt(range);

    const rangemin=(range%2===0)?(range/2)-1:(range-1)/2;
    const rangemax=(range%2===0)?(rangemin+1):rangemin;

    let pagemin=page - rangemin;
    let pagemax=page + rangemax;
    pagemin=pagemin<1?1:pagemin;
    pagemax=(pagemax<(pagemin + range - 1))?pagemin+range - 1:pagemax;

    if(pagemax>pagecount){
        pagemin=(pagemin>1)?pagecount-range + 1 :1;
        pagemax=pagecount;
    }

    pagemin=pagemin<1?1:pagemin;
    return {
        page:page,
        pagecount:pagecount,
        range:range,        
        pagemin:pagemin,
        pagemax:pagemax
    }
}

export function BasePag(props:IBasePagProps){    
    const p=generatePageInfo({
        page:toInt(props.page),
        pagecount:toInt(props.pagecount),        
        range:5,
    } as IBasePageInfoParams);
    const cond_first=p.pagecount>1 && p.page>1;
    let elems:Array<any>=[];
    if(cond_first){
        elems.push(step(1,'first',props.onSetPage));
    }
    if(p.page>1 && p.page!==1){
        elems.push(step(p.page-1,'prev',props.onSetPage));
    }
    //looping 
    for(let i=p.pagemin; i<p.pagemax; i++){
        elems.push(activePage(i,p.page,props.onSetPage));
    }

    if(p.page<p.pagecount){
        elems.push(step(p.page+1,'next',props.onSetPage));
    }

    if(p.pagecount>1 && p.page<p.pagecount){
        elems.push(step(p.pagecount, 'last', props.onSetPage));
    }
    const dsLeft=props.dsLeft!==undefined && (props.dsLeft===true || props.dsLeft===false)?props.dsLeft:true;
    const dsRight=props.dsRight!==undefined && (props.dsRight===true || props.dsRight===false)?props.dsRight:true;

    let info=dsLeft||dsRight?Info({page:p.page,limit:toInt(props.limit),rowcount:toInt(props.rowcount),totalrow:toInt(props.totalrow)}):null;

    let stPag:React.CSSProperties={
        justifyContent:"center",
    };
    if((dsRight && !dsRight) || (!dsLeft && dsRight)){
        stPag.justifyContent=!dsRight?"flex-end":"flex-start;"
    }

    return (
        <div className="pagination">
            {props.dsLeft && info}
            <div className="paging" style={stPag}>{elems}</div>
            {props.dsRight && info}
        </div>
    )
}
