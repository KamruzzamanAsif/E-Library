import { Component } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Users } from 'src/app/models/users';
import { BookRequestingService } from 'src/app/services/book-requesting.service';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-book-request',
  templateUrl: './book-request.component.html',
  styleUrls: ['./book-request.component.css']
})
export class BookRequestComponent implements AfterViewInit{
  constructor(private bookRequestService:BookRequestingService,private _liveAnnouncer: LiveAnnouncer){
    this.dataSource.data = this.dataSource.data.filter(bookRequest => bookRequest.status === 'n/a');
  }
  dataSource = new MatTableDataSource(this.bookRequestService.getRequests());
  displayedColumns: string[] = ['position','book','user', 'approve', 'reject'];
  @ViewChild(MatSort) sort!: MatSort;

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
  approveRow(row:{book:Book,user:Users,status:string}){
    row.status="accepted";
    this.dataSource.data = this.dataSource.data.filter(item => item.status === "n/a");
  }
  rejectRow(row:{book:Book,user:Users,status:string}){
    row.status="rejected";
    this.dataSource.data = this.dataSource.data.filter(item => item.status === "n/a");
  }

}
