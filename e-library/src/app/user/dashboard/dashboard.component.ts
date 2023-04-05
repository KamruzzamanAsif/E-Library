import { Component } from '@angular/core';
import { BorrowedBooks } from '../../models/borrowed-books';
import { BorrowedBooksService } from '../../services/borrowed-books.service';
import { IssuedBookService } from 'src/app/services/issued-book.service';
import { IssuedBook } from 'src/app/models/issued-book';
import { Book } from 'src/app/models/book';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private issuedBookService:IssuedBookService){}
  issuedBooks: {book: Book, user: Users ,issuedDate:string}[] = [{
    book:{
      id: "1",
      title: "abc",
      author: "bcd",
      description: "lalala",
      shelf: "",
      total_quantity: 0,
      available_quantity: 0,
      imageUrl: "../../assets/img/book_cover/discrete_kenneth.png",
      softCopyUrl: "",
      category:""
    },
    user:{
      name:"meh",
      roll:"1214",
      batch:"12",
      session:"19-20",
      program_level:"bsse",
      mobile_number:"014xxxxxxxx",
      address:"abc",
      email:"bsse1233@iit.du.ac.bd",
      password:"123"
    },
    issuedDate:"03/05/23"
  }];

  // ngOnInit(): void{
  //   this.issuedBooks = this.issuedBookService.getIssuedBooks();
  // }
  
}
