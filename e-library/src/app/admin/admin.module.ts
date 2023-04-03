import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { RouterModule } from '@angular/router';
import { UsersRecordComponent } from './users-record/users-record.component';
import { UsersSettingsComponent } from './users-settings/users-settings.component';
import { AllBooksRecordComponent } from './all-books-record/all-books-record.component';
import { AllBooksSettingsComponent } from './all-books-settings/all-books-settings.component';
import { FormsModule } from '@angular/forms';
import { AddBookComponent } from './add-book/add-book.component';
import {MatIconModule} from '@angular/material/icon'



@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminNavbarComponent,
    UsersRecordComponent,
    UsersSettingsComponent,
    AllBooksRecordComponent,
    AllBooksSettingsComponent,
    AddBookComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule
  ],
  exports: [
    AdminDashboardComponent,
    AdminNavbarComponent
  ]
})
export class AdminModule { }
