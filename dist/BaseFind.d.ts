import React from "react";
import { IBaseFindProps, IBaseFindState } from "./types";
type IAnyEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;
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
    protected onClickIns(e?: React.MouseEvent): void;
    protected onClickLoad(e?: React.MouseEvent): void;
    protected onClickSearch(e?: React.MouseEvent): void;
    protected rdrApFind(): any;
    render(): React.JSX.Element;
}
export {};
