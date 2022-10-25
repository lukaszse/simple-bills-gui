import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from "rxjs";
import {DatePipe, DecimalPipe} from "@angular/common";
import {NgbdSortableHeader, SortEvent, SortUtils} from "../../../utils/sortableComponents/sortable.directive";
import {BillsSearchService} from "../../../service/bills-search.service";
import {PageableBills} from "../../../dto/pageableBills";
import {BillsCrudService} from "../../../service/bills-crud.service";


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  providers: [DecimalPipe, DatePipe]
})
export class BillsComponent {

  pageableBills$: Observable<PageableBills>;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public billSearchService: BillsSearchService,
              public billCrudService: BillsCrudService) {
    this.pageableBills$ = billSearchService.pageableBills$;
  }

  onSort({column, direction}: SortEvent) {
    this.headers = SortUtils.resetOtherHeaders(this.headers, column);
    this.billSearchService.sortColumn = column;
    this.billSearchService.sortDirection = direction;
  }

  deleteBill(billNumber: number | string) {
    return this.billCrudService.deleteBill(billNumber)
      .subscribe(console.log);
  }
}
