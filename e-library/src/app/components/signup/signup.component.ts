import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { user } from 'src/app/models/user';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl } from '@angular/forms';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  responseMsg: any;
  users: user[] = [];
  registrationForm: any = FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
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

    // if (!(this.registrationForm.dirty && this.registrationForm.valid)) {
    //   this.snackBarService.openSnackBar('Please fill all the fields', 'error');
    //   return;
    // }

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

    this.userService.signup(data).subscribe((response: any) => {
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
