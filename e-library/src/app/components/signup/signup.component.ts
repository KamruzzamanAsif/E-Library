import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Users } from 'src/app/models/users';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  responseMsg: any;
  users: Users[] = [];
  registrationForm: any = FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private ngxService: NgxUiLoaderService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      roll: [null, [Validators.required, Validators.pattern(GlobalConstants.rollRegex)]],
      batch: [null, [Validators.required]],
      session: [null, [Validators.required, Validators.pattern(GlobalConstants.sessionRegex)]],
      programLevel: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }

  onSubmit() {

    this.ngxService.start();
    var formData = this.registrationForm.value;

    var data = {
      name: formData.fullName,
      roll: formData.roll,
      batch: formData.batch,
      session: formData.session,
      program_level: formData.programLevel,
      mobile_number: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
      address: formData.address
    }

    console.log(data);

    this.apiService.signup(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.responseMsg = response?.message;
      this.snackBarService.openSnackBar(this.responseMsg, '');
      this.router.navigate(['/login']);
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMsg = error.error?.message;
      }
      else {
        this.responseMsg = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMsg, GlobalConstants.error);
    }

    );
  }


}
