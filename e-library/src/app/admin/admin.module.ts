import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { RouterModule } from '@angular/router';
import { UsersRecordComponent } from './users-record/users-record.component';
import { UsersSettingsComponent } from './users-settings/users-settings.component';
import { AllBooksRecordComponent } from './all-books-record/all-books-record.component';
import { AllBooksSettingsComponent } from './all-books-settings/all-books-settings.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminNavbarComponent,
    UsersRecordComponent,
    UsersSettingsComponent,
    AllBooksRecordComponent,
    AllBooksSettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AdminDashboardComponent,
    AdminNavbarComponent
  ]
})
export class AdminModule { }
