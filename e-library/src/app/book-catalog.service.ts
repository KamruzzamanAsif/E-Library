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
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 2',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 3',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 4',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 5',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 6',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 7',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 8',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 9',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 10',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 11',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 12',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 13',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 14',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 15',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 16',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 17',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 18',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 19',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 20',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 21',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 22',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 23',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 24',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 25',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 26',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 27',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 28',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 29',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
    },
    {
      title: 'Book 30',
      author: 'John Doe',
      softcopy: 'No',
      shelf: "",
      total_quantity: 5,
      available_quantity: 5,
      imageUrl: 'https://via.placeholder.com/200x200.png?text=Book+1',
      detailsUrl: '#'
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
}
