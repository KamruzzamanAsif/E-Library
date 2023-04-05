import { Injectable } from '@angular/core';
import { MemberRequest } from '../models/member-request';
import { ApiService } from './api.service';
import { SnackBarService } from './snack-bar.service';
import { GlobalConstants } from '../shared/global-constant';

@Injectable({
  providedIn: 'root'
})
export class MemberRequestService {

  responseMSG: string = '';


  constructor(
    private apiService: ApiService,
    private snackBarService: SnackBarService,
  ) { }

  // applicants:MemberRequest[]=[
  //   {
  //     name: "Tashfia Jannath",
  //     roll: "1221",
  //     session: "19-20",
  //     program_level: "bsse",
  //     batch: "12",
  //     mobile_number: "014xxxxxxxx",
  //     address: "Mouchak",
  //     email: "bsse1221@iit.du.ac.bd",
  //     password:"123",
  //     status:"n/a"
  //   },
  //   {
  //     name: "Mehzabin Haque",
  //     roll: "1233",
  //     session: "19-20",
  //     program_level: "bsse",
  //     batch: "12",
  //     mobile_number: "014xxxxxxxx",
  //     address: "Teacher's quarter",
  //     email: "bsse1223@iit.du.ac.bd",
  //     password:"123",
  //     status:"n/a"
  //   },
  //   {
  //     name: "Hasib Abdullah",
  //     roll: "12xx",
  //     session: "19-20",
  //     program_level: "bsse",
  //     batch: "12",
  //     mobile_number: "014xxxxxxxx",
  //     address: "Chankharpul",
  //     email: "bsse12xx@iit.du.ac.bd",
  //     password:"123",
  //     status:"n/a"
  //   },
  // ];

  getApplicants(): any {
    return this.apiService.not_approved_users();
  }

  setApplicants(data: any): any {

    this.apiService.verify_user(data).subscribe((response: any) => {
      console.log("Approve user: ", response);
      this.responseMSG = response?.message;
      this.snackBarService.openSnackBar(this.responseMSG, '');
    }, (error: any) => {
      console.log("Error: ", error.error.detail)
      if (error.error?.detail) {
        this.responseMSG = error.error?.detail;
      } else {
        this.responseMSG = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(
        this.responseMSG,
        GlobalConstants.error
      );
    });
  }

}
