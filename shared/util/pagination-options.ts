type SortDirection = 'asc' | 'desc' | '';

class PaginationOptions {
  public filters?: any;
  public sort?: string;
  public sortDirection?: SortDirection;
  public pageIndex: number;
  public pageSize: number;
}

export { PaginationOptions, SortDirection };
