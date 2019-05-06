export interface SortingOptions {
    sortField?: string;
    order?: SortingOrder
}

export type SortingOrder = 'asc'| 'desc'|'ascending'|'descending'|1|-1|'';