import React from "react";
export declare type ISelectListProps = {
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
export declare type ISelectListState = {
    loading: boolean;
};
export declare class SelectList<P extends ISelectListProps, S extends ISelectListState> extends React.Component<P, S> {
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
