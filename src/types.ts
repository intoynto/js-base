import {CSSProperties} from "react";

export type IBaseField = {
    f:string,
    alias:string,
    cb?:Function
    align?:"left" | "center" | "right" | "justify" | "char"
    className?:string
    style?:CSSProperties
}

// delete request default : dengan sibling path contoh : data/{id_param}
// delete request qparams : dengan sibling dengan query params. contoh : data?id_param=value_id_param
export type IBaseDeleteRequestType="default"|"qparams";

export type IBaseRequest = {
    search:any
    page:number
    limit:number
}

export type IBaseResponse = {
    limit:number
    page:number
    pagecount:number
    rowcount:number
    totalrow:number
    records:any[]
}

export type IBaseSetupTable = {
    dataName?:string
    fieldid:string | string[]
    fields?:IBaseField[]
    sortField?:string
    sortFieldType?:"string"|"integer"|"double"
}

export type IBaseSearch = {    
    search:string
    [p:string]:any
}

export type IBaseState = {
    loadedCount:number,
    loading:boolean,
    error:any,
    [p:string]:any
}

export type IBaseFindProps = {
    search?:IBaseSearch
    loading?:Boolean
    limit?:number
    useInsert?:boolean
    onSetLimit?:(limi:number)=>void
    onReload?:()=>void
    [p:string]:any
}

export type IBaseFindState = {
    search:IBaseSearch
    [p:string]:any
}

export type IBaseTableItemProps = {
    num?:number
    loading?:boolean    
    useUpdate?:boolean
    useDelete?:boolean
    data?:any

    onUpdate?:(data:any)=>void
    onDelete?:(data:any)=>void
}


export type IBaseTableProps = {
    loading?:boolean
    
    records:any[]
    page:number
    limit:number

    table?:IBaseSetupTable

    useUpdate?:boolean
    useDelete?:boolean

    onUpdate?:(data:any)=>void
    onDelete?:(data:any)=>void
    [p:string]:any
}

export type IBasePagOptions = {
    page:string | number
    pagecount:string | number
    limit:string | number
    rowcount:string | number
    totalrow:string | number
    [p:string]:any
}

export type IBasePagProps = IBasePagOptions & {
    dsLeft?:boolean
    dsRight?:boolean
    onSetPage:(page:number)=>void
}

export type IBasePageInfoParams = {
    page:number
    pagecount:number
    range:number
}

export type IBasePageInfo = {
    page:number
    pagecount:number
    range:number
    pagemin:number
    pagemax:number
}

export type IBaseModalProps = {
    fieldid:string

    data?:any
    url_insert?:string
    url_update?:string
    formTitle?:string

    onClose?:()=>void
    onUpdate?:(newData:any)=>void
    [p:string]:any
}

type IUploadProgress = {
    loaded:number
    total:number
    percentage:number
}

export type IBaseModalState = {
    loading:boolean
    progress:IUploadProgress|null
}

export type IBaseFormProps = {
    fieldid:string
    data?:any
    url_insert?:string    
    url_update?:string
    formTitle?:string

    onClose?:()=>void
    onUpdate?:(n:any)=>void
}

export type IBaseFormState = {
    loading:boolean
}

export type IModalPromiseParameters = IBaseModalProps & {
    component?:any    
}

export type IBaseOptionSearchArrayObject = {
    arrayObj:any[]
    field:string,
    value:string | number,
    sensitive?:boolean
}

export type IBaseProps = {
    className?:string
    
    url_data?:string
    url_delete?:string
    url_delete_UsingPath?:boolean //delete/:field_primary
    url_delete_MethodPath?:string //DELETE

    table:IBaseSetupTable

    useInsert:boolean
    useUpdate:boolean
    useDelete:boolean    

    limit?:number
    
    compFind?:any
    compTbl?:any
    compPag?:any
    compForm?:any

    [p:string]:any
}

export type IChosenListProps = {
    url:string
    params?:any
    method?:string
    name:string
    value:string | number | null | undefined
    fieldid:string
    fieldname:string
    placeholder?:string
    multiple?:boolean
    sortField?:string
    useCache?:boolean
    cacheExpire?:number
    onFieldName?:(data:any)=>void    
    onChange:(e:any)=>void
}

export type IChosenListState = {
    loading:boolean
}


export function handleResponseSelf(this:any,response:any)
{
    const hasSelfRes=this.res!==undefined && this.res!==null && typeof this.res==="object";
    if(!hasSelfRes) return;
    const res=response;
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
        this.res.rowcount=this.res.totalrow;
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