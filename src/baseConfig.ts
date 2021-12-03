import { AlertError, AlertWarn } from "intoy-modal";
import { IajaxException } from "intoy-xhr";
import { IBaseDeleteRequestType } from "./types";

let header:any;
let defaultDeleteRequestType:IBaseDeleteRequestType="qparams";
let defaultBaseModalTitleInsert:string="New";
let defaultBaseModalTitleUpdate:string="Edit";

export function getDefaultDeleteRequestType():IBaseDeleteRequestType
{
    return defaultDeleteRequestType;
}

export function setDefaultDeleteRequestType(value:IBaseDeleteRequestType)
{
    defaultDeleteRequestType=value;
}

export function getDefaultBaseModalTitleInsert():string
{
    return defaultBaseModalTitleInsert;
}

export function setDefaultBaseModalTitleInsert(value:string)
{
    defaultBaseModalTitleInsert=value;
}

export function getDefaultBaseModalTitleUpdate():string
{
    return defaultBaseModalTitleUpdate;
}

export function setDefaultBaseModalTitleUpdate(value:string)
{
    defaultBaseModalTitleUpdate=value;
}

export function setConfigHeader(newHeader:any)
{     
    header=newHeader?newHeader:null;
}

export function getConfigHeader(){    
    let result;    
    if(header){
        if(typeof header==="string"){
            result={
                'Authorization': 'Bearer ' + header
            }
        }
    }    
    return result; 
}

type IappendHBase = {
    msg_before?:string
    msg_after?:string
}

export function handleAlertErrorBase(e:IajaxException,ops?:IappendHBase)
{
    let code=e.code;
    //409 error parse atau HTTP conflict
    if(e.xhr && e.xhr.status!==e.code && e.code!==409)
    {
        code=e.xhr.status;
    }

    const codeWarnings=[400,409,422]; // 
    // 400 Bad Request
    // 409 Conflict parse atau HTTP Conflict
    // 422 Unprcesable Entity
    const inWarning=codeWarnings.indexOf(code)>=0;
    let title=e.title;
    let message=e.message;
    if(inWarning || code===403){
        title=code+' Bad Request';
        if(code===409){
            title='Conflict';
        }
        if(code===422){
            title=code+' Unprocessable';            
        }
        if(code===403)
        {
            title="Access Denied "+code;
        }
    }
    if(ops!==undefined && ops!==null)    
    {
        if(ops.msg_before!==undefined && (ops.msg_before||'').toString().trim().length>0)
        {
            message=ops.msg_before.toString().trim()+'. '+message;
        }

        if(ops.msg_after!==undefined && (ops.msg_after||'').toString().trim().length>0)
        {
            message+='. '+ops.msg_after;
        }
    }
    const func=inWarning?AlertWarn:AlertError;
    func(title,message,'OK');
}