import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookApi } from '../book.api';
import { Book } from '../../../../../shared/models/book.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Component({
  selector: 'aeb-book-detail',
  templateUrl: './book-detail.component.pug',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book: Book;
  public loading = new BehaviorSubject<boolean>(false);

  constructor(private route: ActivatedRoute,
              private bookApi: BookApi,
              private router: Router) {
  }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
  }

  getBookDetails(id: string) {
    this.bookApi.get(id, this.loading)
    .subscribe((data: Book) => {
      this.book = data;
      this.loading.next(false);
    });
  }

  deleteBook(id: string) {
    this.bookApi.delete(id, this.loading)
    .subscribe((data: Book) => {
      this.router.navigate(['/book-list']);
      this.loading.next(false);
    });
  }

}
