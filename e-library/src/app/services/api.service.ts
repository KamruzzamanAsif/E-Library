import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

  checkServer(): any {
    return this.http.get(this.url);
  }

  login(data: any) {
    return this.http.post(this.url + '/login', JSON.stringify(data), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  signup(data: any) {
    return this.http.post(this.url + '/signup', JSON.stringify(data), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  addBooks(data: any) {
    return this.http.post(this.url + '/add-books', JSON.stringify(data), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  allUsers() {
    return this.http.get(this.url + '/users/all_users', {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  not_approved_users() {
    return this.http.get(this.url + '/users/not_approved', {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  verify_user(data: any) {
    return this.http.post(this.url + '/users/verify_user', JSON.stringify(data), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

}
