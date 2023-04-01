import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBooksSettingsComponent } from './all-books-settings.component';

describe('AllBooksSettingsComponent', () => {
  let component: AllBooksSettingsComponent;
  let fixture: ComponentFixture<AllBooksSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBooksSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBooksSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
