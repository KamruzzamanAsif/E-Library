import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRecordComponent } from './users-record.component';

describe('UsersRecordComponent', () => {
  let component: UsersRecordComponent;
  let fixture: ComponentFixture<UsersRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
