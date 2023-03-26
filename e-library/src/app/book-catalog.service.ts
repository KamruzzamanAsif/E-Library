import { Injectable } from '@angular/core';

import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookCatalogService {

  constructor() { }

  books: Book[] = [
    {
      title: 'Book 1',
      author: 'John Doe',
      softcopy: false,
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      softcopy: false,
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 1',
      author: 'John Doe',
      softcopy: false,
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    }
  ];

  getBooks(): Book[] {
    return this.books
  }
}
