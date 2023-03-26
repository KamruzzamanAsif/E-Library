import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCatalogComponent } from './book-catalog.component';

describe('BookCatalogComponent', () => {
  let component: BookCatalogComponent;
  let fixture: ComponentFixture<BookCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
