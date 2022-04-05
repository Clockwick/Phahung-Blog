import { RenderFn } from '../..';
export interface ListBlockData {
    style: 'ordered' | 'unordered';
    items: NestedListItem[];
}
export declare type NestedListItem = {
    content: string;
    items: NestedListItem[];
} | string;
declare const List: RenderFn<ListBlockData>;
export default List;
