export interface Pagination {
    currentPage: number;
    itemsPerPage:number;
    totalItem: number;
    totalPages:number;
}

export class PaginationResult<T> {
    result?: T;
    pagination?: Pagination; 
}