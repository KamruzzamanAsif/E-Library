import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-borrowed-details',
  templateUrl: './borrowed-details.component.html',
  styleUrls: ['./borrowed-details.component.css']
})
export class BorrowedDetailsComponent {
  constructor(private route:ActivatedRoute){};
  bookId:Book=new Book;
  //ai book id ar boi ta table theke nite hobe
  book:Book={id: "1",
  title: "abc",
  author: "bcd",
  description: "lalala",
  shelf: "",
  total_quantity: 0,
  available_quantity: 0,
  imageUrl: "../../assets/img/book_cover/discrete_kenneth.png",
  softCopyUrl: "",
  category:""}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bookId = params['bookId'];
    });
  }
  returnBook():void{
    
  }
}
