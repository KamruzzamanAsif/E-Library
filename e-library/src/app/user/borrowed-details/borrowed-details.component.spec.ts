import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedDetailsComponent } from './borrowed-details.component';

describe('BorrowedDetailsComponent', () => {
  let component: BorrowedDetailsComponent;
  let fixture: ComponentFixture<BorrowedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowedDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
