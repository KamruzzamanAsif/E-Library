import { Injectable } from '@angular/core';
import { MemberRequest } from '../models/member-request';

@Injectable({
  providedIn: 'root'
})
export class MemberRequestService {

  constructor() { }
  applicants:MemberRequest[]=[
    {
      name: "Tashfia Jannath",
      roll: "1221",
      session: "19-20",
      program_level: "bsse",
      batch: "12",
      mobile_number: "014xxxxxxxx",
      address: "Mouchak",
      email: "bsse1221@iit.du.ac.bd",
      password:"123",
      status:"n/a"
    },
    {
      name: "Mehzabin Haque",
      roll: "1233",
      session: "19-20",
      program_level: "bsse",
      batch: "12",
      mobile_number: "014xxxxxxxx",
      address: "Teacher's quarter",
      email: "bsse1223@iit.du.ac.bd",
      password:"123",
      status:"n/a"
    },
    {
      name: "Hasib Abdullah",
      roll: "12xx",
      session: "19-20",
      program_level: "bsse",
      batch: "12",
      mobile_number: "014xxxxxxxx",
      address: "Chankharpul",
      email: "bsse12xx@iit.du.ac.bd",
      password:"123",
      status:"n/a"
    },
  ];
  getApplicants():MemberRequest[]{
    return this.applicants;
  }

}
