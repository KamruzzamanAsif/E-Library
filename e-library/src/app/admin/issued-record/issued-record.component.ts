import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { IssuedBookService } from 'src/app/services/issued-book.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
@Component({
  selector: 'app-issued-record',
  templateUrl: './issued-record.component.html',
  styleUrls: ['./issued-record.component.css']
})
export class IssuedRecordComponent implements AfterViewInit{
  constructor(private issuedBookService:IssuedBookService,private _liveAnnouncer: LiveAnnouncer){}
  dataSource = new MatTableDataSource(this.issuedBookService.getIssuedBooks());
  displayedColumns: string[] = ['position','book','user','issuedDate'];
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
}
