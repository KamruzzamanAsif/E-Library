import { Injectable } from '@angular/core';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  
  users: Users[] = [
    {
      name: "Swarna Islam",
      roll: "1214",
      session: "19-20",
      program_level: "bsse",
      batch: "12",
      mobile_number: "01409614967",
      address: "keraniganj",
      email: "bsse1214@iit.du.ac.bd",
      password: "123"
    },
    {
      name: "Rifah Faria",
      roll: "1213",
      session: "19-20",
      program_level: "bsse",
      batch: "12",
      mobile_number: "014xxxxxxxx",
      address: "Azimpur",
      email: "bsse1213@iit.du.ac.bd",
      password: "123"
    },
    {
      name: "Fahad",
      roll: "1204",
      session: "19-20",
      program_level: "bsse",
      batch: "12",
      mobile_number: "014xxxxxxxx",
      address: "Gazipur",
      email: "bsse1204@iit.du.ac.bd",
      password: "123"
    },
    {
      name: "Kamruzzaman Asif",
      roll: "1217",
      session: "19-20",
      program_level: "bsse",
      batch: "12",
      mobile_number: "014xxxxxxxx",
      address: "Puran Dhaka",
      email: "bsse1217@iit.du.ac.bd",
      password: "123"
    }
  ]

  userToBeViewd: Users = new Users();


  getUsers(): Users[] {
    return this.users;
  }

  getUserToBeViewed(): Users {
    return this.userToBeViewd;
  }

  setUserToBeViewed(index: number): void {
    let user = this.users[index];
    if (user != null) {
      this.userToBeViewd = user;
    }
  }

  deleteUser(email: string): void {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        this.users.splice(i, 1);
      }
    }
  }
}
