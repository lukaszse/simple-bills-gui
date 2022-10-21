import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {mergeMap, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {DatePipe, DecimalPipe} from "@angular/common";
import {NgbdSortableHeader, SortEvent, SortUtils} from "../../../utils/sortableComponents/sortable.directive";
import {BillsService} from "../../../service/bills.service";
import {Bill} from "../../../dto/bill";
import {PageableBills} from "../../../dto/pageableBills";


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  providers: [DecimalPipe, DatePipe]
})
export class BillsComponent implements OnInit {

  pageableBills$: Observable<PageableBills>;
  filter = new FormControl('', {nonNullable: true});
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private billService: BillsService, private decimalPipe: DecimalPipe, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.pageableBills$ = this.billService.getBills().pipe(pageableBill => this.filter.valueChanges.pipe(
      startWith(''),
      mergeMap(text => BillsService.search(pageableBill, text, this.decimalPipe, this.datePipe)
      )));
  }

  onSort({column, direction}: SortEvent) {
    this.headers = SortUtils.resetOtherHeaders(this.headers, column);
    this.pageableBills$ = SortUtils.sortTableByColumn(this.pageableBills$, direction, column)
  }
}
