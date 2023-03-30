import { Component } from '@angular/core';
import { BorrowedBooks } from '../borrowed-books';
import { BorrowedBooksService } from '../borrowed-books.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private borrowedBookService:BorrowedBooksService){}
  books: BorrowedBooks[] = [];

  ngOnInit(): void{
    this.books = this.borrowedBookService.getBorrowedBooks();
  }
  
}
