import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from "rxjs";
import {DatePipe, DecimalPipe} from "@angular/common";
import {NgbdSortableHeader, SortEvent, SortUtils} from "../../../utils/sortableComponents/sortable.directive";
import {BillsSearchService} from "../../../service/bills-search.service";
import {PageableBills} from "../../../dto/pageableBills";
import {BillsCrudService} from "../../../service/bills-crud.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


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
              public billCrudService: BillsCrudService,
              private _modalService: NgbModal) {
    this.pageableBills$ = billSearchService.pageableBills$;
  }

  onSort({column, direction}: SortEvent) {
    this.headers = SortUtils.resetOtherHeaders(this.headers, column);
    this.billSearchService.sortColumn = column;
    this.billSearchService.sortDirection = direction;
  }

  openModelBillDeleteWindow(billNumber: number | string, content) {
    this._modalService.open(content).result.then(
      (result) => {
        console.log(result);
        return this.billCrudService.deleteBill(billNumber)
          .subscribe(console.log);
      },
      (result) => {
        console.log(result);
      }
    );
  }
}
