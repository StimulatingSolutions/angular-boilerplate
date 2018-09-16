import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { BookApi } from '../book.api';
import { Book } from '../../../../../shared/models/book.model';
import { PaginationDataSource } from '../../util/pagination.data-source';
import { MatPaginator, MatSelect, MatSort } from '@angular/material';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'aeb-book-list',
  templateUrl: './book-list.component.pug',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements AfterViewInit {

  public displayedColumns = ['isbn', 'title', 'author'];
  public dataSource: PaginationDataSource<Book>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;
  @ViewChild(MatSelect) searchField: MatSelect;

  constructor(private bookApi: BookApi) {
    this.dataSource = new PaginationDataSource(this.bookApi);
    this.dataSource.pagination.sort = 'isbn';
    this.dataSource.pagination.sortDirection = 'asc';
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.setPaginator(this.paginator);
    this.dataSource.setSort(this.sort);

    // handle search input changes
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(() => {
      this.paginator.pageIndex = 0;
      this.dataSource.pagination.pageIndex = 0;
      const search = this.input.nativeElement.value;
      if (!search) {
        delete this.dataSource.pagination.filters;
      } else {
        this.dataSource.pagination.filters = {};
        this.dataSource.pagination.filters[this.searchField.value] = search;
      }
      this.dataSource.loadData();
    });

    // handle search field changes
    this.searchField.optionSelectionChanges.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.dataSource.pagination.pageIndex = 0;
      const search = this.input.nativeElement.value;
      if (search) {
        this.dataSource.pagination.filters = {};
        this.dataSource.pagination.filters[this.searchField.value] = search;
        this.dataSource.loadData();
      }
    });
  }

}
