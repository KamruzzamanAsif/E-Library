import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookCatalogComponent} from './components/book-catalog/book-catalog.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {path:"", component:HomepageComponent},
  {path:"home",component:HomepageComponent},
  {path:"user-dashboard", component:DashboardComponent},
  {path:"book-catalog", component:BookCatalogComponent},
  {path:"book-details", component:BookDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
