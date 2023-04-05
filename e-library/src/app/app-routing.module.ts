import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookCatalogComponent} from './components/book-catalog/book-catalog.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';

import { UsersSettingsComponent } from './admin/users-settings/users-settings.component';
import { UsersRecordComponent } from './admin/users-record/users-record.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AllBooksRecordComponent } from './admin/all-books-record/all-books-record.component';
import { AllBooksSettingsComponent } from './admin/all-books-settings/all-books-settings.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CategoryComponent } from './components/category/category.component';
import { AddBookComponent } from './admin/add-book/add-book.component';
import { MemberRequestComponent } from './admin/member-request/member-request.component';
import { BookRequestComponent } from './admin/book-request/book-request.component';
import { BookReturnComponent } from './admin/book-return/book-return.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';

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
  {path:"all-book-settings",component:AllBooksSettingsComponent},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"category",component:CategoryComponent},
  {path:"add-book",component:AddBookComponent},
  {path:"member-request", component:MemberRequestComponent},
  {path:"book-request",component:BookRequestComponent},
  {path:"book-return", component:BookReturnComponent},
  {path:"about",component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
