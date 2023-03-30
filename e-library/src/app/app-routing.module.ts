import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookCatalogComponent} from './book-catalog/book-catalog.component';
import {BookDetailsComponent} from './book-details/book-details.component';

const routes: Routes = [
  {path:"book-catalog", component:BookCatalogComponent},
  {path:"book-details", component:BookDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
