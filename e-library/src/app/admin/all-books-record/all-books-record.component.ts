import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookCatalogService } from 'src/app/services/book-catalog.service';
import {Book} from 'src/app/models/book'

@Component({
  selector: 'app-all-books-record',
  templateUrl: './all-books-record.component.html',
  styleUrls: ['./all-books-record.component.css']
})
export class AllBooksRecordComponent {
  constructor(private router:Router, private bookService:BookCatalogService){}
  books:Book[]=[];

  ngOnInit():void{
    this.books=this.bookService.getBooks();
  }
  editBook(index:number):void{
    this.bookService.setBookToBeViewed(index);
    this.router.navigate(['all-book-settings']);
  }
}
