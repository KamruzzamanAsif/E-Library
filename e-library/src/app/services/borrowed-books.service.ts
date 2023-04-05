import { Injectable } from '@angular/core';
import { BorrowedBooks } from '../models/borrowed-books';

@Injectable({
  providedIn: 'root'
})
export class BorrowedBooksService {

  constructor() { }
  borrowedBooks: BorrowedBooks[] = [
    {
      bookId: 5,
      issuedDate:"02/04/23"
    },
    {
      bookId:3,
      issuedDate:"02/04/23",
    },
    {
      bookId:2,
      issuedDate:"02/04/23",
    }
  ]
  bookToBeViewed: BorrowedBooks = new BorrowedBooks();

  getBorrowedBooks():BorrowedBooks[]{
    return this.borrowedBooks;
  }
  setBookToBeViewed(index: number): void{
    let book = this.borrowedBooks[index];
    if(book != null)
      this.bookToBeViewed = book;
  }

  getBookToBeViewed(): BorrowedBooks {
    return this.bookToBeViewed;
  }
}
