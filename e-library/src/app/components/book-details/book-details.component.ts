
import { BookCatalogService } from './../../services/book-catalog.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  book: Book = new Book();

  constructor(private bookCatalogService: BookCatalogService, private router: Router, private domSanitizer: DomSanitizer) {}

  sanitizeImageUrl(url: string) {
    console.log("Sanitization is on...")
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit(): void{
    this.book = this.bookCatalogService.getBookToBeViewed();
  }

  requestBook(): void{

  }
  
}
