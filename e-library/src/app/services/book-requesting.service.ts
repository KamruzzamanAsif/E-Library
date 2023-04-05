import { Injectable } from '@angular/core';
import { BookRequesting } from '../models/book-requesting';
import { UsersService } from './users.service';
import { BookCatalogService } from './book-catalog.service';
import { Users } from '../models/users';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookRequestingService {
  allUsers: Users[] = [];
  allBooks: Book[] = [];
  data!: { book: Book, user: Users ,status:string}[];
  constructor(private userService: UsersService, private bookService: BookCatalogService) { }

  requests: BookRequesting[] = [
    { email: "bsse1214@iit.du.ac.bd", bookId: 4, status:"n/a" },
    { email: "bsse1221@iit.du.ac.bd", bookId: 1, status:"n/a" }
  ]
  ngOnInit(): void {
    this.allUsers = this.userService.getUsers();
    this.allBooks = this.bookService.getBooks();
    for (let i = 0; i < this.requests.length; i++) {
      let user;
      for (let j = 0; j < this.allUsers.length; j++) {
        if (this.allUsers[j].email === this.requests[i].email) {
          user = this.allUsers[j];
          break;
        }
      }
      if (user) {
        const details = { book: this.allBooks[this.requests[i].bookId], user ,status:this.requests[i].status};
        this.data.push(details);
      }
    }
    
  }
  getRequests(): {book: Book, user: Users, status:string}[] {
    return this.data;
  }
}