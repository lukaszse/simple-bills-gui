import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable, tap} from "rxjs";
import {map} from 'rxjs/operators'
import {SortableComponent} from "../../../interfaces/sortableComponent";
import {
  SimpleBillsClientService,
  NgbdSortableHeader,
  SortEvent,
  compare,
  SortUtils
} from "../../../service/simpleBillsClient.service";

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
export class BillsComponent implements OnInit, SortableComponent {

  private static billsEndpoint: string = "/bills";
  bills$: Observable<Bill[]>;

  constructor(private simpleBillsClientService: SimpleBillsClientService) { }

  ngOnInit() {
    this.bills$ = this.getBillsObservable();
  }

  getBillsObservable() : Observable<Bill[]> {
    return this.simpleBillsClientService
      .get(BillsComponent.billsEndpoint).pipe(
      tap(console.log));
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  onSort({column, direction}: SortEvent) {
    this.headers = SortUtils.resetOtherHeaders(this.headers, column);
    this.bills$ = SortUtils.sortTable(this, direction, column)
  }
}
