import { Injectable } from '@angular/core';
import { IssuedBook } from '../models/issued-book';
import { UsersService } from './users.service';
import { BookCatalogService } from './book-catalog.service';
import { Users } from '../models/users';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class IssuedBookService {

  constructor(private userService: UsersService, private bookService: BookCatalogService) { }

  issuedBooks:IssuedBook[]=[
    {bookId:1,email:"bsse1213@iit.du.ac.bd",issuedDate:"05/04/23"},
    {bookId:1,email:"bsse1233@iit.du.ac.bd",issuedDate:"06/04/23"}
  ]

  allUsers: Users[] = [];
  allBooks: Book[] = [];
  data!: { book: Book, user: Users ,issuedDate:string}[];
  ngOnInit(): void {
    this.allUsers = this.userService.getUsers();
    this.allBooks = this.bookService.getBooks();
    for (let i = 0; i < this.issuedBooks.length; i++) {
      let user;
      for (let j = 0; j < this.allUsers.length; j++) {
        if (this.allUsers[j].email === this.issuedBooks[i].email) {
          user = this.allUsers[j];
          break;
        }
      }
      if (user) {
        const details = { book: this.allBooks[this.issuedBooks[i].bookId], user ,issuedDate: this.issuedBooks[i].issuedDate};
        this.data.push(details);
      }
    }
    
  }
  getIssuedBooks():{book: Book, user: Users ,issuedDate:string}[]{
    return this.data;
  }
}
