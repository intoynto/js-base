import React from "react";
import { Iajax } from "intoy-xhr";
export interface IBaseLoaderProps {
    url?: string;
    params?: any;
    method?: string;
}
export interface IBaseLoaderState {
    loading: boolean;
    error: any;
}
declare class BaseLoader<P extends IBaseLoaderProps, S extends IBaseLoaderState> extends React.Component<P, S> {
    protected res: any;
    constructor(props: P);
    protected getStp(): Iajax;
    protected doLoad(): void;
    protected onReload(e?: React.MouseEvent): void;
    componentDidMount(): void;
}
export { BaseLoader };
