import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import {BookService} from '../book.service';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.pug',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  bookForm: FormGroup;
  isbn: string;
  title: string;
  description: string;
  author: string;
  publisher: string;
  published_year: string;

  constructor(private router: Router, private api: BookService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'isbn' : [null, Validators.required],
      'title' : [null, Validators.required],
      'description' : [null, Validators.required],
      'author' : [null, Validators.required],
      'publisher' : [null, Validators.required],
      'published_year' : [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postBook(form)
    .subscribe(res => {
      const id = res['_id'];
      this.router.navigate(['/book-details', id]);
    }, (err) => {
      console.log(err);
    });
  }

}