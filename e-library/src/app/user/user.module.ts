import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowedDetailsComponent } from './borrowed-details/borrowed-details.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    BorrowedDetailsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class UserModule { }
