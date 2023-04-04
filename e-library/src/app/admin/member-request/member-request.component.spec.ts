import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRequestComponent } from './member-request.component';

describe('MemberRequestComponent', () => {
  let component: MemberRequestComponent;
  let fixture: ComponentFixture<MemberRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
