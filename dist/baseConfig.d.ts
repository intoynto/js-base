import { IajaxException } from "intoy-xhr";
import { IBaseDeleteRequestType } from "./types";
declare type IbaseResAttr = {
    records: string;
    page: string;
    pagecount: string;
    limit: string;
    rowcount: string;
    totalrow: string;
};
export declare function baseResAttrGet(): IbaseResAttr;
export declare function baseResAttrSet(props: IbaseResAttr): void;
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
declare type IappendHBase = {
    msg_before?: string;
    msg_after?: string;
};
export declare function handleAlertErrorBase(e: IajaxException, ops?: IappendHBase): void;
export {};
