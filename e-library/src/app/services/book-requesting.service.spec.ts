import { TestBed } from '@angular/core/testing';

import { BookRequestingService } from './book-requesting.service';

describe('BookRequestingService', () => {
  let service: BookRequestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRequestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
