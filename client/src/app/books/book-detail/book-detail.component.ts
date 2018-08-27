import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from '../book.service';
import {Book} from '../../../../../shared/models/Book';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.pug',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute, private api: BookService, private router: Router) { }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
  }

  getBookDetails(id) {
    this.api.getBook(id)
    .subscribe(data => {
      console.log(data);
      this.book = data;
    });
  }

  deleteBook(id) {
    this.api.deleteBook(id)
    .subscribe(res => {
        this.router.navigate(['/books']);
      }, (err) => {
        console.log(err);
      }
    );
  }

}
