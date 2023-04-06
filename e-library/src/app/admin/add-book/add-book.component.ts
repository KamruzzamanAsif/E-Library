import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FloatLabelType } from '@angular/material/form-field';
import { ApiService } from 'src/app/services/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {


  myControl = new FormControl('');
  books: any = FormGroup;
  imageSrc: string = '';
  selectedCategory: any;
  responseMsg: string = '';
  fileToUpload: any;
  data: any;


  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiService,
    private ngxService: NgxUiLoaderService,
    private snackBarService: SnackBarService,
    private router: Router,
    private http: HttpClient
  ) { }

  options: string[] = ['Data Structure and Algorithms', 'Machine Learning', 'Object Oriented Programming', 'Operating Systm', 'Web Application Development', 'Others'];
  filteredOptions!: Observable<string[]>;

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  options2 = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });


  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.books = this._formBuilder.group({
      bookID: [''],
      bookTitle: [''],
      bookAuthor: [''],
      bookCategory: [''],
      availableCopies: [''],
      description: [''],
      bookShelf: [''],
      imageURL: [''],
      softCopyURL: [''],
    });

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onFileSelected(event: any) {
    // const selectedFile = <File>event.target.files[0];
    // console.log(selectedFile.name); // outputs the name of the selected file
    // console.log(selectedFile.type); // outputs the type of the selected file
    // console.log(selectedFile.size); // outputs the size of the selected file

    this.fileToUpload = <File>event.target.files[0];
    console.log("FILE: ", this.fileToUpload);
  }

  onOptionSelected(option: string) {
    this.selectedCategory = option;
    console.log(option); // do something with the selected value
  }

  addBooks(event: any) {

    var bookData = this.books.value;

    // save image and send to server
    event.preventDefault();
    const formData = new FormData();

    formData.append('image', this.fileToUpload, this.fileToUpload.name);

    this.apiService.addImage(formData).subscribe(
      (response) => {

        this.data = {
          id: bookData.bookID,
          title: bookData.bookTitle,
          author: bookData.bookAuthor,
          description: bookData.description,
          shelf: bookData.bookShelf,
          total_quantity: bookData.availableCopies,
          available_quantity: bookData.availableCopies,
          imageUrl: "D:\\images\\" + this.fileToUpload.name,
          softcopyUrl: bookData.softCopyURL,
          category: this.selectedCategory,
        }

      },
      (error) => {
        console.log(error);
      }
    );

    this.apiService.addBooks(this.data).subscribe(
      (response: any) => {
        console.log("RES: ", response);
        this.ngxService.stop();
        this.responseMsg = response?.message;
        this.snackBarService.openSnackBar(this.responseMsg, '');
        this.router.navigate(['/all-books-record']);
      }, (error) => {
        console.log("Error: ", error)
        this.ngxService.stop();
        if (error.error?.detail) {
          this.responseMsg = error.error?.detail;
        }
        else {
          this.responseMsg = GlobalConstants.genericError;
        }
        this.snackBarService.openSnackBar(this.responseMsg, GlobalConstants.error);
      });

  }
}