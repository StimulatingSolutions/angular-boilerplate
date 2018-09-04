import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { BookApi } from '../book.api';
import { Book } from '../../../../../shared/models/book.model';
import { ValidationService } from '../../util/validation/validation.service';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.pug',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  bookForm: FormGroup;
  cancelRoute: any[];
  public loading = new BehaviorSubject<boolean>(false);

  id?: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private bookApi: BookApi,
              private formBuilder: FormBuilder) {
    this.loading.next(true);
  }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'isbn': [null, [Validators.required, Validators.min(1)]],
      'title': [null, [Validators.required, Validators.minLength(4)]],
      'description': [null, Validators.required],
      'author': [null, Validators.required],
      'publisher': [null, [Validators.required, Validators.minLength(4)]],
      'published_year': [null, [Validators.required, Validators.min(1600)]]
    });
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.cancelRoute = ['/book-details/', this.id];
      this.bookApi.get(this.id)
      .subscribe((data: Book) => {
        this.bookForm.patchValue(data);
        // by default, the form only shows errors after a field has been touched; that's fine for entity creation,
        // but we want anything preventing a submit on an existing entity (maybe saved before changes were made to
        // validation) to show up immediately
        ValidationService.validateForm(this.bookForm);
        this.loading.next(false);
      });
    } else {
      this.cancelRoute = ['/book-list/'];
      this.loading.next(false);
    }
  }

  onFormSubmit(form: NgForm) {
    let submit: Function;
    if (this.id) {
      submit = this.bookApi.update.bind(this.bookApi, this.id, form, this.loading);
    } else {
      submit = this.bookApi.create.bind(this.bookApi, form, this.loading);
    }

    submit()
    .subscribe((res: Book) => {
      const id = res['_id'];
      this.router.navigate(['/book-details', id]);
      this.loading.next(false);
    });
  }

}
