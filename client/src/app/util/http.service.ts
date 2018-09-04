import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs/index';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError } from 'rxjs/operators';
import * as assign from 'lodash.assign';


const DEFAULT_HTTP_OPTIONS = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public static handleError(error: HttpErrorResponse) {
    if (error.error && error.error.message) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  public static prepOptions(options: any): any {

    if (!options) {
      return DEFAULT_HTTP_OPTIONS;
    }

    options = assign({}, DEFAULT_HTTP_OPTIONS, options);

    if (options.params != null && !(options.params instanceof HttpParams)) {
      options.params = new HttpParams();
      for (const key of Object.keys(options.params)) {
        options.params = options.params.set(key, options.params[key]);
      }
    }

    if (options.pagination) {
      if (!options.params) {
        options.params = new HttpParams();
      }
      if (options.pagination.filters) {
        for (const key of Object.keys(options.pagination.filters)) {
          options.params = options.params.set(`~filter.${key}`, options.pagination.filters[key]);
        }
      }
      if (options.pagination.sort) {
        options.params = options.params.set('~sort', options.pagination.sort);
        options.params = options.params.set('~sortDirection', options.pagination.sortDirection || 1);
      }
      options.params = options.params.set('~pageIndex', options.pagination.pageIndex || 0);
      options.params = options.params.set('~pageSize', options.pagination.pageSize || 10);
    }
    delete options.pagination;

    return options;
  }


  constructor(protected http: HttpClient) {
  }

  private httpRequest(method: string, loading: BehaviorSubject<boolean>, ...args: any[]): Observable<any> {
    if (loading) {
      loading.next(true);
    }

    let observable: Observable<any> = this.http[method](...args)
    .pipe(catchError(HttpService.handleError));

    if (loading) {
      observable = observable.pipe(catchError((error: HttpErrorResponse) => {
        loading.next(false);
        return throwError(error);
      }));
    }

    return observable;
  }

  public get(loading: BehaviorSubject<boolean>, url: string, options: any = null): Observable<any> {
    return this.httpRequest('get', loading, url, HttpService.prepOptions(options));
  }

  public put(loading: BehaviorSubject<boolean>, url: string, body: any | null, options: any = null): Observable<any> {
    return this.httpRequest('put', loading, url, body, HttpService.prepOptions(options));
  }

  public post(loading: BehaviorSubject<boolean>, url: string, body: any | null, options: any = null): Observable<any> {
    return this.httpRequest('post', loading, url, body, HttpService.prepOptions(options));
  }

  public delete(loading: BehaviorSubject<boolean>, url: string, options: any = null): Observable<any> {
    return this.httpRequest('delete', loading, url, HttpService.prepOptions(options));
  }
}
