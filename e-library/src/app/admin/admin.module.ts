import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { RouterModule } from '@angular/router';
import { UsersRecordComponent } from './users-record/users-record.component';
import { UsersSettingsComponent } from './users-settings/users-settings.component';
import { AllBooksRecordComponent } from './all-books-record/all-books-record.component';
import { AllBooksSettingsComponent } from './all-books-settings/all-books-settings.component';
import { FormsModule } from '@angular/forms';
import { AddBookComponent } from './add-book/add-book.component';
import { MatIconModule} from '@angular/material/icon';
import { MemberRequestComponent } from './member-request/member-request.component';
<<<<<<< HEAD
import { BookRequestComponent } from './book-request/book-request.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { BookReturnComponent } from './book-return/book-return.component';
=======
import { BookRequestComponent } from './book-request/book-request.component';
import { BookReturnComponent } from './book-return/book-return.component'
>>>>>>> 6797c916530fc37d30a3a583c399b2636c0ab7f6

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminNavbarComponent,
    UsersRecordComponent,
    UsersSettingsComponent,
    AllBooksRecordComponent,
    AllBooksSettingsComponent,
    AddBookComponent,
    MemberRequestComponent,
    BookRequestComponent,
    BookReturnComponent,
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
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  exports: [
    AdminDashboardComponent,
    AdminNavbarComponent
  ]
})
export class AdminModule { }
