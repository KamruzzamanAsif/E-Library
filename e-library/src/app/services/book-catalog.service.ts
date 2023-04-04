import { Injectable } from '@angular/core';

import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookCatalogService {

  constructor() { }

  books: Book[] = [
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"ml"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"dsa"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"oop"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"dsa"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"oop"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"ml"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"os"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"ml"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"dsa"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"os"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"ml"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"oop"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"dsa"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"dsa"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"oop"
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      description: 'this is abc book',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#',
      category:"ml"
    }
  ];

  bookToBeViewed: Book = new Book();

  getBooks(): Book[] {
    return this.books
  }

  setBookToBeViewed(index: number): void{
    let book = this.books[index];
    if(book != null)
      this.bookToBeViewed = book;
  }

  getBookToBeViewed(): Book {
    return this.bookToBeViewed;
  }
  addNewBook(book:Book):void{
    this.books.push(book);
  }
}