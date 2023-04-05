import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {


  myControl = new FormControl('');
  books: any = FormGroup;
  imageSrc: string = '';


  options: string[] = ['Data Structure and Algorithms', 'Machine Learning', 'Object Oriented Programming', 'Operating Systm', 'Web Application Development', 'Others'];
  filteredOptions!: Observable<string[]>;

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  options2 = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(private _formBuilder: FormBuilder) { }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.books = this._formBuilder.group({
      bookTitle: [''],
      bookAuthor: [''],
      bookCategory: [''],
      availableCopies: [''],
      description: [''],
      softCopy: [''],
      totalCopies: [''],
      imageURL: [''],
      softCopyURL: [''],
    });

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        console.log("IMG: " + this.imageSrc);
      };
    }
  }


  addBook() {

    var bookData = this.books.value;

    var data = {
      title: bookData.bookTitle,
      author: bookData.bookAuthor,
      category: bookData.bookCategory,
      available_copies: bookData.availableCopies,
      description: bookData.description,
      soft_copy: bookData.softCopy,
    }



  }
}