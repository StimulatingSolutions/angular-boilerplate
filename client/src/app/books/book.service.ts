import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Book} from '../../../../shared/models/book.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = '/api';
const bookApiUrl = `${apiUrl}/book`;


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  private static handleError(error: HttpErrorResponse) {
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

  getBooks(): Observable<Book[]> {
    return <Observable<Book[]>>this.http.get(bookApiUrl, httpOptions)
    .pipe(catchError(BookService.handleError));
  }

  getBook(id: string): Observable<Book> {
    const url = `${bookApiUrl}/${id}`;
    return <Observable<Book>>this.http.get(url, httpOptions)
    .pipe(
      catchError(BookService.handleError)
    );
  }

  postBook(data): Observable<Book> {
    return <Observable<Book>>this.http.post(bookApiUrl, data, httpOptions)
    .pipe(catchError(BookService.handleError));
  }

  updateBook(id, data): Observable<Book> {
    const url = `${bookApiUrl}/${id}`;
    return <Observable<Book>>this.http.put(url, data, httpOptions)
    .pipe(catchError(BookService.handleError));
  }

  deleteBook(id: string): Observable<Book> {
    const url = `${bookApiUrl}/${id}`;
    return <Observable<Book>>this.http.delete(url, httpOptions)
    .pipe(catchError(BookService.handleError));
  }

}
