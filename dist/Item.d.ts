import React from "react";
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
declare class Item<P extends IBaseItemProps, S extends IBaseItemState> extends React.Component<P, S> {
    constructor(props: P);
    protected gInitState(props?: P): S;
    onTgOpen(e?: React.MouseEvent): void;
    onReloadSelf(): void;
    rdrChild(): any;
}
export { Item };
