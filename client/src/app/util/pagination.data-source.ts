import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BaseCrudApi } from './base-crud.api';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { PaginationOptions } from '../../../../shared/util/PaginationOptions';
import { ListPage } from '../../../../shared/util/ListPage';
import { Observable } from 'rxjs/internal/Observable';



class PaginationDataSource<T> extends DataSource<T> {

  private dataSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public loading: Observable<boolean> = this.loadingSubject.asObservable();
  public totalAvailable: number = 0;
  public pagination: PaginationOptions;

  constructor(private api: BaseCrudApi<T>) {
    super();
    this.pagination = new PaginationOptions();
  }

  connect(collectionViewer: CollectionViewer) {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  loadData() {

    this.api.getListPage(this.pagination, this.loadingSubject)
    .pipe(catchError(() => of([])))
    .subscribe((data: ListPage<T>) => {
      this.totalAvailable = data.total;
      this.dataSubject.next(data.page);
      this.loadingSubject.next(false);
    });

  }

}

export { PaginationDataSource }
