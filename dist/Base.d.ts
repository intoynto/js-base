import React, { ReactNode } from "react";
import { LoadingOverlay } from "intoy-modal";
import { Iajax } from "intoy-xhr";
import { IBaseProps, IBaseSearch, IBaseState, IBaseOptionSearchArrayObject, IBaseRequest, IBaseResponse, IBaseDeleteRequestType } from "./types";
export declare class Base<P extends IBaseProps, S extends IBaseState> extends React.Component<P, S> {
    protected lodOv: LoadingOverlay<any> | null;
    protected search: IBaseSearch;
    protected records: any;
    protected req: IBaseRequest;
    protected res: IBaseResponse;
    protected asgFieldShow: number;
    protected updOnDidUpRecord: boolean;
    protected clrDataOnFailed: boolean;
    protected _mod: boolean;
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
    protected handRespAft(success?: boolean): void;
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
    /**
     * Check if page has change
     * @param number page
     * @returns bool
     */
    protected hasChangePage(page: number): boolean;
    onSetPage(page: number): void;
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
