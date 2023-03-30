import { Injectable } from '@angular/core';
import { BorrowedBooks } from './borrowed-books';

@Injectable({
  providedIn: 'root'
})
export class BorrowedBooksService {

  constructor() { }
  borrowedBooks: BorrowedBooks[] = [
    {
      title: 'Discrete Mathematics and Its Applications',
      author: 'N/A',
      imageUrl: '../../assets/img/book_cover/discrete_kenneth.png',
      issuedDate:"02/04/23",
      expireDate:"06/04/23",
      borrowDetails:"../../assets/img/discrete-mathematics-and-its-applications-seventh-.pdf"
    },
    {
      title: 'Discrete Mathematics and Its Applications',
      author: 'N/A',
      imageUrl: '../../assets/img/book_cover/discrete_kenneth.png',
      issuedDate:"02/04/23",
      expireDate:"06/04/23",
      borrowDetails:"../../assets/img/discrete-mathematics-and-its-applications-seventh-.pdf"
    },
    {
      title: 'Discrete Mathematics and Its Applications',
      author: 'N/A',
      imageUrl: '../../assets/img/book_cover/discrete_kenneth.png',
      issuedDate:"02/04/23",
      expireDate:"06/04/23",
      borrowDetails:"../../assets/img/discrete-mathematics-and-its-applications-seventh-.pdf"
    },
    {
      title: 'Discrete Mathematics and Its Applications',
      author: 'N/A',
      imageUrl: '../../assets/img/book_cover/discrete_kenneth.png',
      issuedDate:"02/04/23",
      expireDate:"06/04/23",
      borrowDetails:"../../assets/img/discrete-mathematics-and-its-applications-seventh-.pdf"
    },
    {
      title: 'Discrete Mathematics and Its Applications',
      author: 'N/A',
      imageUrl: '../../assets/img/book_cover/discrete_kenneth.png',
      issuedDate:"02/04/23",
      expireDate:"06/04/23",
      borrowDetails:"../../assets/img/discrete-mathematics-and-its-applications-seventh-.pdf"
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
