import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationOptions } from '../../../../shared/util/pagination-options';
import { ListPage } from '../../../../shared/util/list-page';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
abstract class BaseCrudApi<T> {

  private apiUrl = '/api';
  protected abstract path: string;

  constructor(protected http: HttpService) {
  }

  getList(loading: BehaviorSubject<boolean> = null): Observable<T[]> {
    return <Observable<T[]>>this.http.get(loading, `${this.apiUrl}/${this.path}`);
  }

  getListPage(pagination: PaginationOptions = null, loading: BehaviorSubject<boolean> = null): Observable<ListPage<T>> {
    const options = pagination ? {pagination} : null;
    return <Observable<ListPage<T>>>this.http.get(loading, `${this.apiUrl}/${this.path}`, options);
  }

  count(pagination: PaginationOptions = null, loading: BehaviorSubject<boolean> = null): Observable<number> {
    const options = {params: {'~countOnly': null}, pagination};
    return <Observable<number>>this.http.get(loading, `${this.apiUrl}/${this.path}`, options);
  }

  get(id: string, loading: BehaviorSubject<boolean> = null): Observable<T> {
    return <Observable<T>>this.http.get(loading, `${this.apiUrl}/${this.path}/${id}`);
  }

  create(data: T, loading: BehaviorSubject<boolean> = null): Observable<T> {
    return <Observable<T>>this.http.post(loading, `${this.apiUrl}/${this.path}`, data);
  }

  update(id: string, data: T, loading: BehaviorSubject<boolean> = null): Observable<T> {
    return <Observable<T>>this.http.put(loading, `${this.apiUrl}/${this.path}/${id}`, data);
  }

  delete(id: string, loading: BehaviorSubject<boolean> = null): Observable<T> {
    return <Observable<T>>this.http.delete(loading, `${this.apiUrl}/${this.path}/${id}`);
  }

}

export { BaseCrudApi };
