type SortDirection = 'asc' | 'desc' | '';

class PaginationOptions {
  public sort?: string;  // mongo field on which to sort
  public sortDirection?: SortDirection;
  public pageIndex: number;
  public pageSize: number;
  // While the 4 above have been standardized, there is currently no convention (in this app) for how to specify filters and operators.
  // In fact, doing so naively could be a bad idea, as it might allow users to craft queries you didn't intend to allow.  So, handling
  // of filters is left to be defined on a per-route (or per-model) basis.
  public filters?: any;
}

export { PaginationOptions, SortDirection };
