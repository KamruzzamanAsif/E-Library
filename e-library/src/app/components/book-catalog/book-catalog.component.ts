
import { BookCatalogService } from './../../services/book-catalog.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css']
})
export class BookCatalogComponent implements OnInit{
  constructor(private bookCatalogService: BookCatalogService, private router: Router) {}

  books: Book[] = [];
  catalogSize: number = 0;

  ngOnInit(): void{
    this.books = this.bookCatalogService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      console.log(this.books);
    });
    this.catalogSize = this.books.length;
  }

  viewDetails(index: number): void{
    var book = this.books[index];
    this.bookCatalogService.setBookToBeViewed(book);
    this.router.navigate(["book-details"]);
  }
}
