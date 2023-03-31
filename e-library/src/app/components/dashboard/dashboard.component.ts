import { Component } from '@angular/core';
import { BorrowedBooks } from './../../models/borrowed-books';
import { BorrowedBooksService } from './../../services/borrowed-books.service';

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
