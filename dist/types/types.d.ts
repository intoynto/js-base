import { CSSProperties } from "react";
export declare type IBaseField = {
    f: string;
    alias: string;
    cb?: Function;
    align?: "left" | "center" | "right" | "justify" | "char";
    className?: string;
    style?: CSSProperties;
};
export declare type IBaseDeleteRequestType = "default" | "qparams";
export declare type IBaseRequest = {
    search: any;
    page: number;
    limit: number;
};
export declare type IBaseResponse = {
    limit: number;
    page: number;
    pagecount: number;
    rowcount: number;
    totalrow: number;
    records: any[];
};
export declare type IBaseSetupTable = {
    dataName?: string;
    fieldid: string | string[];
    fields?: IBaseField[];
    sortField?: string;
    sortFieldType?: "string" | "integer" | "double";
};
export declare type IBaseSearch = {
    search: string;
    [p: string]: any;
};
export declare type IBaseState = {
    loadedCount: number;
    loading: boolean;
    error: any;
    [p: string]: any;
};
export declare type IBaseFindProps = {
    search?: IBaseSearch;
    loading?: Boolean;
    limit?: number;
    useInsert?: boolean;
    onSetLimit?: (limi: number) => void;
    onReload?: () => void;
    [p: string]: any;
};
export declare type IBaseFindState = {
    search: IBaseSearch;
    [p: string]: any;
};
export declare type IBaseTableItemProps = {
    num?: number;
    loading?: boolean;
    useUpdate?: boolean;
    useDelete?: boolean;
    data?: any;
    onUpdate?: (data: any) => void;
    onDelete?: (data: any) => void;
};
export declare type IBaseTableProps = {
    loading?: boolean;
    records: any[];
    page: number;
    limit: number;
    table?: IBaseSetupTable;
    useUpdate?: boolean;
    useDelete?: boolean;
    onUpdate?: (data: any) => void;
    onDelete?: (data: any) => void;
    [p: string]: any;
};
export declare type IBasePagOptions = {
    page: string | number;
    pagecount: string | number;
    limit: string | number;
    rowcount: string | number;
    totalrow: string | number;
    [p: string]: any;
};
export declare type IBasePagProps = IBasePagOptions & {
    dsLeft?: boolean;
    dsRight?: boolean;
    onSetPage: (page: number) => void;
};
export declare type IBasePageInfoParams = {
    page: number;
    pagecount: number;
    range: number;
};
export declare type IBasePageInfo = {
    page: number;
    pagecount: number;
    range: number;
    pagemin: number;
    pagemax: number;
};
export declare type IBaseModalProps = {
    fieldid: string;
    data?: any;
    url_insert?: string;
    url_update?: string;
    formTitle?: string;
    onClose?: () => void;
    onUpdate?: (newData: any) => void;
    [p: string]: any;
};
declare type IUploadProgress = {
    loaded: number;
    total: number;
    percentage: number;
};
export declare type IBaseModalState = {
    loading: boolean;
    progress: IUploadProgress | null;
};
export declare type IBaseFormProps = {
    fieldid: string;
    data?: any;
    url_insert?: string;
    url_update?: string;
    formTitle?: string;
    onClose?: () => void;
    onUpdate?: (n: any) => void;
};
export declare type IBaseFormState = {
    loading: boolean;
};
export declare type IModalPromiseParameters = IBaseModalProps & {
    component?: any;
};
export declare type IBaseOptionSearchArrayObject = {
    arrayObj: any[];
    field: string;
    value: string | number;
    sensitive?: boolean;
};
export declare type IBaseProps = {
    className?: string;
    url_data?: string;
    url_delete?: string;
    url_delete_UsingPath?: boolean;
    url_delete_MethodPath?: string;
    table: IBaseSetupTable;
    useInsert: boolean;
    useUpdate: boolean;
    useDelete: boolean;
    limit?: number;
    compFind?: any;
    compTbl?: any;
    compPag?: any;
    compForm?: any;
    [p: string]: any;
};
export declare type IChosenListProps = {
    url: string;
    params?: any;
    method?: string;
    name: string;
    value: string | number | null | undefined;
    fieldid: string;
    fieldname: string;
    placeholder?: string;
    multiple?: boolean;
    sortField?: string;
    useCache?: boolean;
    cacheExpire?: number;
    onFieldName?: (data: any) => void;
    onChange: (e: any) => void;
};
export declare type IChosenListState = {
    loading: boolean;
};
export declare function handleResponseSelf(this: any, response: any): void;
export {};
