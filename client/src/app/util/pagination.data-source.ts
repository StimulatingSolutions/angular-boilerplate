import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BaseCrudApi } from './base-crud.api';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { PaginationOptions } from '../../../../shared/util/pagination-options';
import { ListPage } from '../../../../shared/util/list-page';
import { Observable } from 'rxjs/internal/Observable';
import { MatPaginator, MatSort } from '@angular/material';


class PaginationDataSource<T> extends DataSource<T> {

  private dataSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private sort: MatSort;
  private sortSubscription: any;
  private paginator: MatPaginator;
  private paginatorSubscription: any;

  public loading: Observable<boolean> = this.loadingSubject.asObservable();
  public totalAvailable = 0;
  public pagination: PaginationOptions;

  constructor(private api: BaseCrudApi<T>) {
    super();
    this.pagination = new PaginationOptions();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
      this.sortSubscription = null;
    }
    if (this.paginatorSubscription) {
      this.paginatorSubscription.unsubscribe();
      this.paginatorSubscription = null;
    }
  }

  loadData(): void {
    this.api.getListPage(this.pagination, this.loadingSubject)
    .pipe(catchError(() => of([])))
    .subscribe((data: ListPage<T>) => {
      this.totalAvailable = data.total;
      this.dataSubject.next(data.page);
      this.loadingSubject.next(false);
    });
  }

  setSort(sort: MatSort): void {
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }
    this.sort = sort;

    // handle sort changes
    this.sortSubscription = this.sort.sortChange.subscribe(() => {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.pagination.pageIndex = 0;
      this.pagination.sort = this.sort.active;
      this.pagination.sortDirection = this.sort.direction;
      this.loadData();
    });
  }

  setPaginator(paginator: MatPaginator): void {
    if (this.paginatorSubscription) {
      this.paginatorSubscription.unsubscribe();
    }
    this.paginator = paginator;

    // handle pagination changes
    this.paginator.page.subscribe(() => {
      this.pagination.pageIndex = this.paginator.pageIndex;
      this.pagination.pageSize = this.paginator.pageSize;
      this.loadData();
    });
  }

}

export { PaginationDataSource };
