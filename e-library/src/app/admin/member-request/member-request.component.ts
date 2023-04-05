import { Component } from '@angular/core';
import { MemberRequest } from 'src/app/models/member-request';
import { MemberRequestService } from 'src/app/services/member-request.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookCatalogService } from 'src/app/services/book-catalog.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-member-request',
  templateUrl: './member-request.component.html',
  styleUrls: ['./member-request.component.css']
})

export class MemberRequestComponent implements AfterViewInit {

  applicants: MemberRequest[] = [];
  dataSource = new MatTableDataSource(this.applicants);
  responseMSG: string = '';

  constructor(
    private memberRequestService: MemberRequestService,
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UsersService,
    private snackBarService: SnackBarService,
  ) {
  }

  displayedColumns: string[] = ['position', 'name', 'roll', 'batch', 'session', 'program_level', 'mobile_number', 'email', 'address', 'approve', 'reject'];

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.memberRequestService.getApplicants().subscribe((data: any) => {
      this.applicants = data;
      console.log("Applicants: ", this.applicants);
      this.dataSource = new MatTableDataSource(this.applicants); // set the data source here
      this.dataSource.data = this.dataSource.data.filter(memberRequest => memberRequest.status === 'false');
    });
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  rejectRow(row: MemberRequest) {
    row.status = 'rejected';
    this.dataSource.data = this.dataSource.data.filter(item => item.status === "false");

    let user: Users = new Users;
    ({ status, ...user } = { ...row });

    var data = {
      user_email: user.email,
      status: 'false'
    }

    this.memberRequestService.setApplicants(data);
  }

  approveRow(row: MemberRequest) {
    row.status = 'approved';

    let user: Users = new Users;
    ({ status, ...user } = { ...row });

    this.userService.addNewUser(user);
    this.dataSource.data = this.dataSource.data.filter(item => item.status === "false");

    var data = {
      user_email: user.email,
      status: 'true'
    }

    this.memberRequestService.setApplicants(data);
  }


}
