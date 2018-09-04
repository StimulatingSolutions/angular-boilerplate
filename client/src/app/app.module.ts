import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatSelect, MatSelectModule, MatOptionModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { TitleService } from './util/title.service';
import { HttpService } from './util/http.service';
import { ValidationMessageComponent } from './util/validation/validation-message.component';
import { BookApi } from './books/book.api';
import { LoadingSpinnerComponent } from './util/loading-spinner/loading-spinner.component';


const appRoutes: Routes = [
  {
    path: 'book-list',
    component: BookListComponent,
    data: {title: 'Book List'}
  },
  {
    path: 'book-details/:id',
    component: BookDetailComponent,
    data: {title: 'Book Details'}
  },
  {
    path: 'book-edit/:id',
    component: BookEditComponent,
    data: {title: 'Edit Book'}
  },
  {
    path: 'book-create',
    component: BookEditComponent,
    data: {title: 'Create Book'}
  },
  {
    path: '',
    redirectTo: '/book-list',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailComponent,
    BookEditComponent,
    ValidationMessageComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [
    TitleService,
    BookApi,
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private titleService: TitleService) {
    titleService.autoSetTitle();
  }
}

