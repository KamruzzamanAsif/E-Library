import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBooksRecordComponent } from './all-books-record.component';

describe('AllBooksRecordComponent', () => {
  let component: AllBooksRecordComponent;
  let fixture: ComponentFixture<AllBooksRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBooksRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBooksRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
