import { TestBed } from '@angular/core/testing';

import { IssuedBookService } from './issued-book.service';

describe('IssuedBookService', () => {
  let service: IssuedBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuedBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
