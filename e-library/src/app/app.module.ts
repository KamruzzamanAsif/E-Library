import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookCatalogComponent } from './components/book-catalog/book-catalog.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminModule } from "./admin/admin.module";
import { CategoryComponent } from './components/category/category.component';
<<<<<<< HEAD
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
=======
import { AboutComponent } from './components/about/about.component';
>>>>>>> 6797c916530fc37d30a3a583c399b2636c0ab7f6

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  pbColor: 'red',
  bgsColor: 'red',
  fgsColor: 'red',
  fgsType: SPINNER.threeStrings,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
    declarations: [
        AppComponent,
        BookCatalogComponent,
        HomepageComponent,
        NavbarComponent,
        BookDetailsComponent,
        DashboardComponent,
        FooterComponent,
        SignupComponent,
        LoginComponent,
        CategoryComponent,
        DialogBoxComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        AdminModule,
        MatDialogModule,
        MatButtonModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
