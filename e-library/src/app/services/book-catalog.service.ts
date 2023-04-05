import { Injectable } from '@angular/core';

import { Book } from '../models/book';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from './api.service';
import { SnackBarService } from './snack-bar.service';
import { GlobalConstants } from '../shared/global-constant';

@Injectable({
  providedIn: 'root'
})
export class BookCatalogService {
  responseMsg: any;

  constructor(
    private apiService: ApiService,
    private ngxService: NgxUiLoaderService,
    private snackBarService: SnackBarService,
    private router: Router,
  ) { }

  books: Book[] = [];
  // books: Book[] = [
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"ml"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"dsa"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"oop"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"dsa"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"oop"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"ml"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"os"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"ml"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"dsa"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"os"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"ml"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"oop"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"dsa"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"dsa"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"oop"
  //   },
  //   {
  //     title: 'Book 1',
  //     author: 'John Doe',
  //     description: 'this is abc book',
  //     softcopy: 'No',
  //     shelf: "",
  //     total_quantity: 5,
  //     available_quantity: 5,
  //     imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
  //     detailsUrl: '#',
  //     category:"ml"
  //   }
  // ];

  bookToBeViewed: Book = new Book();

  getBooks(): any {
    return this.apiService.allBooks();
    // return this.books
  }

  setBookToBeViewed(book: Book): void {
    if (book != null)
      this.bookToBeViewed = book;
  }

  getBookToBeViewed(): Book {
    return this.bookToBeViewed;
  }

  updateBook(bookID: any, bookData: any): void {
    console.log("Book ID: ", bookID);
    this.apiService.updateBook(bookID, bookData).subscribe((response: any) => {
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

  deleteBook(bookID: any): void {
  }
}