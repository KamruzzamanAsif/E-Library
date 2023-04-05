import { Component } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BookReturnService } from 'src/app/services/book-return.service';
import { Book } from 'src/app/models/book';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-book-return',
  templateUrl: './book-return.component.html',
  styleUrls: ['./book-return.component.css']
})
export class BookReturnComponent {
  constructor(private bookReturnService:BookReturnService,private _liveAnnouncer: LiveAnnouncer){
    this.dataSource.data = this.dataSource.data.filter(bookReturn => bookReturn.status === false);
  }
  dataSource = new MatTableDataSource(this.bookReturnService.getReturns());
  displayedColumns: string[] = ['position','book','user','issuedDate', 'approve'];
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
  approveRow(row:{book:Book,user:Users,status:boolean}){
    row.status=true;
    this.dataSource.data = this.dataSource.data.filter(item => item.status === false);
  }
}
