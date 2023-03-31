import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookCatalogComponent} from './book-catalog/book-catalog.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UsersSettingsComponent } from './admin/users-settings/users-settings.component';
import { UsersRecordComponent } from './admin/users-record/users-record.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AllBooksRecordComponent } from './admin/all-books-record/all-books-record.component';
import { AllBooksSettingsComponent } from './admin/all-books-settings/all-books-settings.component';

const routes: Routes = [
  {path:"", component:HomepageComponent},
  {path:"home",component:HomepageComponent},
  {path:"user-dashboard", component:DashboardComponent},
  {path:"book-catalog", component:BookCatalogComponent},
  {path:"book-details", component:BookDetailsComponent},
  {path:"users-record",component:UsersRecordComponent},
  {path:"admin-dashboard",component:AdminDashboardComponent},
  {path:"users-settings",component:UsersSettingsComponent},
  {path:"all-books-record",component:AllBooksRecordComponent},
  {path:"all-book-settings",component:AllBooksSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
