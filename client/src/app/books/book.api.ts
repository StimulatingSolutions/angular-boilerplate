import { Injectable } from '@angular/core';
import { Book } from '../../../../shared/models/book.model';
import { BaseCrudApi } from '../util/base-crud.api';
import { HttpService } from '../util/http.service';


@Injectable({
  providedIn: 'root'
})
export class BookApi extends BaseCrudApi<Book> {

  protected path = 'book';

  constructor(protected http: HttpService) {
    super(http);
  }

}
