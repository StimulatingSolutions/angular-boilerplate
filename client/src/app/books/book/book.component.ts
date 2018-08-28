import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

import { BookService } from '../book.service';
import {Book} from '../../../../../shared/models/book.model';


export class BookDataSource extends DataSource<Book> {
  constructor(private api: BookService) {
    super();
  }

  connect() {
    return this.api.getBooks();
  }

  disconnect() {

  }
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.pug',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  books: any;
  displayedColumns = ['isbn', 'title', 'author'];
  dataSource = new BookDataSource(this.api);

  constructor(private api: BookService) { }

  ngOnInit() {
    this.api.getBooks()
    .subscribe(res => {
      console.log(res);
      this.books = res;
    }, err => {
      console.log(err);
    });
  }

}
