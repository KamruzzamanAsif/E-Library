import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedRecordComponent } from './issued-record.component';

describe('IssuedRecordComponent', () => {
  let component: IssuedRecordComponent;
  let fixture: ComponentFixture<IssuedRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuedRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuedRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
