import {Component, OnInit, PipeTransform, QueryList, ViewChildren} from '@angular/core';
import {mergeMap, Observable, startWith, tap} from "rxjs";
import {map} from 'rxjs/operators'
import {FormControl} from "@angular/forms";
import {DatePipe, DecimalPipe} from "@angular/common";
import {NgbdSortableHeader, SortEvent, SortUtils} from "../../../utils/sortableComponents/sortable.directive";
import {BillsService} from "../../../service/bills.service";
import {SortableComponent} from "../../../utils/sortableComponents/sortableComponent";

interface Bill {
  billNumber: string;
  user: string
  date: string
  description: string
  category: string
  amount: number,
  totalCount: number
}

function search(bills: Observable<Bill[]>, text: string, decimalPipe: PipeTransform, datePipe: DatePipe): Observable<Bill[]> {
  return bills.pipe(
    map(bill => bill.filter(bill => {
      const term = text.toLowerCase();
      return decimalPipe.transform(bill.billNumber).includes(term)
        || datePipe.transform(bill.date).includes(term)
        || decimalPipe.transform(bill.amount).includes(term)
        || bill.description.toLowerCase().includes(term)
        || bill.category.toLowerCase().includes(term)
    }))
  )
}

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  providers: [DecimalPipe, DatePipe]
})
export class BillsComponent implements OnInit, SortableComponent {

  bills$: Observable<Bill[]>;
  filter = new FormControl('', {nonNullable: true});
  totalCount: number;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private billService: BillsService, private decimalPipe: DecimalPipe, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.bills$ = this.getSortableElements().pipe(bills => this.filter.valueChanges.pipe(
      startWith(''),
      mergeMap(text => search(bills, text, this.decimalPipe, this.datePipe)
      )));
  }

  getSortableElements(): Observable<Bill[]> {
    return this.billService
      .getBills().pipe(
        tap(console.log),
        map(response => response.body));
  }

  onSort({column, direction}: SortEvent) {
    this.headers = SortUtils.resetOtherHeaders(this.headers, column);
    this.bills$ = SortUtils.sortTable(this, direction, column)
  }
}
