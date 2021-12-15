/// <reference types="react" />
export declare class Base<P extends IBaseProps, S extends IBaseState> extends React.Component<P, S> {
    protected lodOv: LoadingOverlay<any> | null;
    protected search: IBaseSearch;
    protected records: any;
    protected req: IBaseRequest;
    protected res: IBaseResponse;
    protected asgFieldShow: number;
    protected updOnDidUpRecord: boolean;
    protected clrDataOnFailed: boolean;
    protected delReqTipe: IBaseDeleteRequestType;
    constructor(props: P);
    protected gInitState(props?: P): S;
    protected ovOpen(ops?: any): void;
    protected ovClose(): void;
    protected getIndexArrayObj(props: IBaseOptionSearchArrayObject): number;
    protected didUpRecord(index: number, prevData: any, current: any): void;
    protected onItemBeforeUpdate(item: any): void;
    protected onItemUpdated(): void;
    protected didUpList(): void;
    protected handResp(res: any): void;
    protected handSort(): void;
    protected handFilter(): void;
    protected handRespAft(): void;
    protected getSetup(params?: any): Iajax;
    doReload(): void;
    onReload(): void;
    onSearch(newSearch: IBaseSearch): void;
    onAftInsert(newData: any): void;
    onInsert(): void;
    onAftUpdate(newData: any): void;
    onUpdate(data: any): void;
    onAftDelete(data: any, fieldid: any, value: any): void;
    protected getMsgDel(data: any): string;
    protected getSetupDel(data: any): Iajax;
    protected doSndDelete(se: Iajax): void;
    onDelete(data: any): void;
    onSetPage(page: number): false | undefined;
    onSetLimit: (limit: number) => void;
    getFndProps(): any;
    getTblProps(): {
        useUpdate: P["useUpdate"];
        useDelete: P["useDelete"];
        onUpdate: (data: any) => void;
        onDelete: (data: any) => void;
        onReload: () => void;
        table: P["table"];
        records: any;
        page: number;
        limit: number;
        loading: S["loading"];
    };
    getPagProps(): any;
    rdrFind(): ReactNode | any;
    rdrTable(): ReactNode | any;
    rdrPag(): ReactNode | any;
    rdrChilds(): ReactNode | any;
    render(): ReactNode | any;
    componentDidMount(): void;
}

export declare type IAnyEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;
export declare class BaseFind<P extends IBaseFindProps, S extends IBaseFindState> extends React.Component<P, S> {
    protected textInsert: string;
    protected textReload: string;
    protected textReloadIcon: string;
    protected btnInsertClass: string;
    protected btnInsertIcon: any;
    constructor(props: P);
    protected gInitState(props?: P): S;
    protected callPropsSearch(): void;
    protected onCh(e: IAnyEvent): void;
    protected onChUpdate(e: IAnyEvent): void;
    protected onChLimit(e: IAnyEvent): void;
    protected hKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void;
    protected rdrApFind(): any;
    render(): JSX.Element;
}

export declare type IAnyEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;
export declare class BaseModal<P extends IBaseModalProps, S extends IBaseModalState> extends React.Component<P, S> {
    protected prevData: any;
    protected data: any;
    protected classForm: string;
    protected styleForm: CSSProperties;
    protected btnSaveText: string;
    protected btnCancelText: string;
    protected useEfieldId: boolean;
    protected titleIns: string;
    protected titleUpd: string;
    constructor(props: P);
    protected gInitState(): S;
    protected nodeForm: RefObject<HTMLFormElement> | any;
    protected getIncludeFields(): string[];
    getEditing(): boolean;
    getSetup(): Iajax;
    protected hUploadProgress(prog: IUploadProgress): void;
    protected onSuccess(data: any): void;
    onSubmit(e?: React.FormEvent<HTMLFormElement>): void;
    onCh(e: IAnyEvent): void;
    onClSubmit(e?: React.MouseEvent): void;
    rdrTitle(): any;
    rdrActions(): React.ReactNode | null | undefined;
    rdrContent(): JSX.Element;
    render(): React.ReactNode;
}
export { BaseModal };
export declare function createModalPromise({ component, url_insert, url_update, formTitle, data, fieldid, ...any }: IModalPromiseParameters): Promise<unknown>;

export declare function generatePageInfo({ page, pagecount, range }: IBasePageInfoParams): IBasePageInfo;
export declare function BasePag(props: IBasePagProps): JSX.Element;

export declare function generateFromSetupTable(table: IBaseSetupTable): any;
export declare class BaseTable extends React.Component<IBaseTableProps> {
    constructor(props: IBaseTableProps);
    table: any;
    render(): JSX.Element;
}

export declare class ChosenList<P extends IChosenListProps, S extends IChosenListState> extends React.Component<P, S> {
    protected options: Array<any>;
    protected chosenOptions: Array<any> | any;
    constructor(props: P);
    getInitialState(): S;
    applyAftRes: () => void;
    doLoad(): void;
    onReload(): void;
    componentDidMount(): void;
    componentDidUpdate(prev: P): void;
    render(): JSX.Element;
}

export interface IBaseItemProps {
    index: number;
    num: number;
    data: any;
    useUpdate: boolean;
    useDelete: boolean;
    onUpdate?: (data: any) => void;
    onDelete?: (data: any) => void;
    onReload?: () => void;
    onReloadItem?: () => void;
    didUpRecord?: (index: number, prev: any, current: any) => void;
}
export interface IBaseItemState {
    open: boolean;
}
export declare class Item<P extends IBaseItemProps, S extends IBaseItemState> extends React.Component<P, S> {
    constructor(props: P);
    protected gInitState(props?: P): S;
    onTgOpen(e?: React.MouseEvent): void;
    onReloadSelf(): void;
    rdrChild(): any;
}
export { Item };

export interface IBaseLoaderProps {
    url?: string;
    params?: any;
    method?: string;
}
export interface IBaseLoaderState {
    loading: boolean;
    error: any;
}
export declare class BaseLoader<P extends IBaseLoaderProps, S extends IBaseLoaderState> extends React.Component<P, S> {
    protected res: any;
    constructor(props: P);
    protected getStp(): Iajax;
    protected doLoad(): void;
    protected onReload(e?: React.MouseEvent): void;
    componentDidMount(): void;
}
export { BaseLoader };

export declare function getDefaultDeleteRequestType(): IBaseDeleteRequestType;
export declare function setDefaultDeleteRequestType(value: IBaseDeleteRequestType): void;
export declare function getDefaultBaseModalTitleInsert(): string;
export declare function setDefaultBaseModalTitleInsert(value: string): void;
export declare function getDefaultBaseModalTitleUpdate(): string;
export declare function setDefaultBaseModalTitleUpdate(value: string): void;
export declare function setConfigHeader(newHeader: any): void;
export declare function getConfigHeader(): {
    Authorization: string;
} | undefined;
export declare type IappendHBase = {
    msg_before?: string;
    msg_after?: string;
};
export declare function handleAlertErrorBase(e: IajaxException, ops?: IappendHBase): void;

export * from "./Base";
export * from "./BaseFind";
export * from "./BasePag";
export * from "./BaseTable";
export * from "./BaseModal";
export * from "./ChosenList";
export * from "./Item";
export * from "./Loader";
export * from "./baseConfig";
export * from "./types";

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
export declare type IUploadProgress = {
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
