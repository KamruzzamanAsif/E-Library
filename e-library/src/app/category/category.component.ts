import { Component, Input } from '@angular/core';
import { Book } from '../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookCatalogService } from '../services/book-catalog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category: string = "";
  books: Book[] = []
  constructor(private route: ActivatedRoute, private bookService: BookCatalogService, private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.books = [];
      this.category = params['category'];
      let book = this.bookService.getBooks();

      for (let i = 0; i < book.length; i++) {
        if (book[i].category === this.category) {
          this.books.push(book[i]);
        }
      }
    });
  }
  viewDetails(index: number): void{
    this.bookService.setBookToBeViewed(index);
    this.router.navigate(["book-details"]);
  }

}
