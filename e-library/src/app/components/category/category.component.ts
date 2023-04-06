import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookCatalogService } from '../../services/book-catalog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category: string = "";
  allBooks: Book[] = [];
  books: Book[] = [];
  constructor(private route: ActivatedRoute, private bookService: BookCatalogService, private router:Router) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.allBooks = books;
      console.log(this.allBooks);
    });

    this.route.queryParams.subscribe(params => {
      var currentCategory = params['category'];

      for (let i = 0; i < this.allBooks.length; i++) {
        if (this.allBooks[i].category === "Data Structure and Algorithms" && currentCategory === "dsa") {
          this.books.push(this.allBooks[i]);
        } 
      }

    });
  }

  viewDetails(index: number): void{
    var book = this.allBooks[index];
    this.bookService.setBookToBeViewed(book);
    this.router.navigate(["book-details"]);
  }

}
