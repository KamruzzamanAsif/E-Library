import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

  checkServer(): any {
    return this.http.get(this.url);
  }

  signup(data: any) {
    return this.http.post(this.url + '/user/signup', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  login(data: any) {
    return this.http.post(this.url + '/user/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
