import { Book, BookCollection } from '../../shared/models/book.model';
import BaseCrudCtrl from './base-crud.controller';
import * as regexEscape from 'escape-string-regexp';

class BookCtrl extends BaseCrudCtrl<Book> {
  model = BookCollection;
  path = 'book';
  buildFilterConditions = (params: any): any => {
    const result: any = {};
    if (params.title) {
      result.title = new RegExp(regexEscape(params.title), 'i');
    }
    if (params.isbn) {
      result.isbn = new RegExp(regexEscape(params.isbn), 'i');
    }
    if (params.author) {
      result.author = new RegExp(regexEscape(params.author), 'i');
    }
    return result;
  };
}

export { BookCtrl };
