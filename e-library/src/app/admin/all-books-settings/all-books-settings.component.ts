import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book'
import { BookCatalogService } from 'src/app/services/book-catalog.service';

@Component({
  selector: 'app-all-books-settings',
  templateUrl: './all-books-settings.component.html',
  styleUrls: ['./all-books-settings.component.css']
})
export class AllBooksSettingsComponent implements OnInit {
  constructor(private router: Router, private bookService: BookCatalogService) { }
  
  book: Book = new Book();
  ngOnInit(): void {
    this.book = this.bookService.getBookToBeViewed();
    console.log(this.book)
  }
  updated(): void {
    this.router.navigate(['all-books-record'])
  }
}
