
import { BookCatalogService } from './../../services/book-catalog.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  book: Book = new Book();

  constructor(private bookCatalogService: BookCatalogService, private router: Router) {}

  ngOnInit(): void{
    this.book = this.bookCatalogService.getBookToBeViewed();
  }

  requestBook(): void{

  }

}
