import { Book, BookCollection } from '../../shared/models/book.model';
import BaseCtrl from './base.controller';

class BookCtrl extends BaseCtrl<Book> {
  model = BookCollection;
  path = 'book';
}

export { BookCtrl };
