import React from "react";
import { IChosenListProps, IChosenListState } from "./types";
/**
 * @deprecated Sebagai pengganti gunakan component <SelectList {...props} />
 */
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
