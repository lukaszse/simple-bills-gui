import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {mergeMap, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {DatePipe, DecimalPipe} from "@angular/common";
import {NgbdSortableHeader, SortEvent, SortUtils} from "../../../utils/sortableComponents/sortable.directive";
import {BillsService} from "../../../service/bills.service";
import {Bill} from "../../../dto/bill";


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  providers: [DecimalPipe, DatePipe]
})
export class BillsComponent implements OnInit {

  bills$: Observable<Bill[]>;
  filter = new FormControl('', {nonNullable: true});
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private billService: BillsService, private decimalPipe: DecimalPipe, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.bills$ = this.billService.getBills().pipe(bills => this.filter.valueChanges.pipe(
      startWith(''),
      mergeMap(text => BillsService.search(bills, text, this.decimalPipe, this.datePipe)
      )));
  }

  onSort({column, direction}: SortEvent) {
    this.headers = SortUtils.resetOtherHeaders(this.headers, column);
    this.bills$ = SortUtils.sortTableByColumn(this.bills$, direction, column)
  }
}
