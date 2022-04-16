import React from "react";
import { IBaseTableProps, IBaseSetupTable } from "./types";
export declare function generateFromSetupTable(table: IBaseSetupTable): any;
export declare class BaseTable extends React.Component<IBaseTableProps> {
    constructor(props: IBaseTableProps);
    table: any;
    render(): JSX.Element;
}
