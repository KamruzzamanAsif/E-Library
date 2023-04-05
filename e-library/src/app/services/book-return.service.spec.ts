import { TestBed } from '@angular/core/testing';

import { BookReturnService } from './book-return.service';

describe('BookReturnService', () => {
  let service: BookReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookReturnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
