import { RenderFn } from '../..';
declare type Row = string[];
declare type Content = Row[];
export interface TableBlockData {
    content: Content;
    withHeadings?: boolean;
    header?: string[];
    footer?: string[];
    caption?: string;
}
declare const Table: RenderFn<TableBlockData>;
export default Table;
