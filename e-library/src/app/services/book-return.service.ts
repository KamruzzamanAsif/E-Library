import { Injectable } from '@angular/core';
import { BookReturn } from '../models/book-return';
import { UsersService } from './users.service';
import { BookCatalogService } from './book-catalog.service';
import { Users } from '../models/users';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookReturnService {

  constructor(private userService: UsersService, private bookService: BookCatalogService) { }
  bookReturns:BookReturn[]=[
    {bookId:1,email:"bsse1213@iit.du.ac.bd",issuedDate:"05/04/23",status:false},
    {bookId:1,email:"bsse1233@iit.du.ac.bd",issuedDate:"06/04/23", status:false}
  ]
  allUsers: Users[] = [];
  allBooks: Book[] = [];
  data!: { book: Book, user: Users ,issuedDate:string,status:boolean}[];
  ngOnInit(): void {
    this.allUsers = this.userService.getUsers();
    this.allBooks = this.bookService.getBooks();
    for (let i = 0; i < this.bookReturns.length; i++) {
      let user;
      for (let j = 0; j < this.allUsers.length; j++) {
        if (this.allUsers[j].email === this.bookReturns[i].email) {
          user = this.allUsers[j];
          break;
        }
      }
      if (user) {
        const details = { book: this.allBooks[this.bookReturns[i].bookId], user ,issuedDate: this.bookReturns[i].issuedDate, status:this.bookReturns[i].status};
        this.data.push(details);
      }
    }
    
  }
  getReturns():{book: Book, user: Users ,issuedDate:string,status:boolean}[]{
    return this.data;
  }
}
