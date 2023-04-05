import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Book } from 'src/app/models/book'
import { ApiService } from 'src/app/services/api.service';
import { BookCatalogService } from 'src/app/services/book-catalog.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-all-books-settings',
  templateUrl: './all-books-settings.component.html',
  styleUrls: ['./all-books-settings.component.css']
})
export class AllBooksSettingsComponent implements OnInit {

  constructor(
    private router: Router,
    private bookService: BookCatalogService
  ) { }
  
  categories = ['Data Structure and Algorithms', 'Machine Learning', 'Object Oriented Programming', 'Operating Systm', 'Web Application Development', 'Others'];
  book: Book = new Book();

  ngOnInit(): void {
    this.book = this.bookService.getBookToBeViewed();
    console.log(this.book)
  }
  updateBooks(): void {
    
    var data = {
      id: this.book.id,
      title: this.book.title,
      author: this.book.author,
      description: this.book.description,
      shelf: this.book.shelf,
      total_quantity: this.book.total_quantity,
      available_quantity: this.book.available_quantity,
      imageUrl: this.book.imageUrl,
      softCopyUrl: this.book.softCopyUrl,
      category: this.book.category      
    }

    console.log(data);

    this.bookService.updateBook(this.book.id, data)

    this.router.navigate(['all-books-record'])
  }
}
