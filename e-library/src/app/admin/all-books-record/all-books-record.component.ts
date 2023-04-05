import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookCatalogService } from 'src/app/services/book-catalog.service';
import { Book } from 'src/app/models/book'
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';


@Component({
  selector: 'app-all-books-record',
  templateUrl: './all-books-record.component.html',
  styleUrls: ['./all-books-record.component.css']
})
export class AllBooksRecordComponent {
  constructor(
    private router: Router,
    private bookService: BookCatalogService,
    private dialog: MatDialog,
  ) { }

  books: Book[] = [];

  ngOnInit(): any {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      console.log(this.books);
    });
  }

  editBook(index: number): void {
    var book = this.books[index];
    this.bookService.setBookToBeViewed(book);
    this.router.navigate(['all-book-settings']);
  }

  deleteBook(index: number): void {

    const dialogRef = this.dialog.open(DialogBoxComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "true") {
        var bookid = this.books[index].id;
        this.bookService.deleteBook(bookid);
        this.books.splice(index, 1);
        this.router.navigate(['all-books-recod']).then(() => {
          window.location.reload();
        });
      }
    });




  }
}
