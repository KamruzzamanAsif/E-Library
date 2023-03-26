import { TestBed } from '@angular/core/testing';

import { BookCatalogService } from './book-catalog.service';

describe('BookCatalogService', () => {
  let service: BookCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
