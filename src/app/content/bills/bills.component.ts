import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from "rxjs";
import {DatePipe, DecimalPipe} from "@angular/common";
import {NgbdSortableHeader, SortEvent, SortUtils} from "../../../utils/sortableComponents/sortable.directive";
import {BillsSearchService} from "../../../service/bills-search.service";
import {PageableBills} from "../../../dto/pageableBills";


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  providers: [DecimalPipe, DatePipe]
})
export class BillsComponent {

  pageableBills$: Observable<PageableBills>;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public billService: BillsSearchService) {
    this.pageableBills$ = billService.pageableBills$;
  }

  onSort({column, direction}: SortEvent) {
    this.headers = SortUtils.resetOtherHeaders(this.headers, column);
    this.billService.sortColumn = column;
    this.billService.sortDirection = direction;
  }
}
