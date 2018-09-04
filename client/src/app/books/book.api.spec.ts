import { TestBed, inject } from '@angular/core/testing';

import { BookApi } from './book.api';

describe('BookApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookApi]
    });
  });

  it('should be created', inject([BookApi], (service: BookApi) => {
    expect(service).toBeTruthy();
  }));
});
