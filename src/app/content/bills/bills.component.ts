import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable, tap} from "rxjs";
import {map} from 'rxjs/operators'
import {HttpClientService, NgbdSortableHeader, SortEvent, compare} from "../../httpClient.service";

interface Bill {
  billNumber: string;
  user: string
  date: string
  description: string
  category: string
  amount: number,
}

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  private static billsEndpoint: string = "/bills";
  bills$: Observable<Bill[]>;

  constructor(private httpClientService:HttpClientService) { }

  ngOnInit() {
    this.bills$ = this.getBillsObservable();
  }

  getBillsObservable() : Observable<Bill[]> {
    return this.httpClientService
      .get(BillsComponent.billsEndpoint).pipe(
      tap(console.log));
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting table
    if (direction === '' || column === '') {
      this.bills$ = this.getBillsObservable();
    } else {
      this.bills$ = this.getBillsObservable().pipe(
        map(bills => bills.sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        } )));
    }
  }
}
