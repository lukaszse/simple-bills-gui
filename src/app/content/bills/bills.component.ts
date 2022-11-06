import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from "rxjs";
import { DatePipe, DecimalPipe, formatDate } from "@angular/common";
import { NgbdSortableHeader, SortEvent, SortUtils } from "../../../utils/sortableComponents/sortable.directive";
import { BillsSearchService } from "../../../service/bills-search.service";
import { PageableBills } from "../../../dto/pageableBills";
import { BillsCrudService } from "../../../service/bills-crud.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BillCreation } from "../../../dto/billCreation";
import { Category } from "../../../dto/category";
import { CategoryService } from "../../../service/category.service";


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  providers: [DecimalPipe, DatePipe]
})
export class BillsComponent implements OnInit {

  billCreationDto: BillCreation = {
    category: null,
    description: null,
    amount: null,
    date: null
  };

  category: Category = {
    name: null,
    limit: null
  };

  categories$;

  pageableBills$: Observable<PageableBills>;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public billSearchService: BillsSearchService,
              private billCrudService: BillsCrudService,
              private categoryService: CategoryService,
              private _modalService: NgbModal) {
    this.pageableBills$ = billSearchService.pageableBills$;
    this.categories$ = this.categoryService.getCategories()
  }

  ngOnInit(): void {
    this.billSearchService.refresh()
  }

  onSort({column, direction}: SortEvent) {
    this.headers = SortUtils.resetOtherHeaders(this.headers, column);
    this.billSearchService.sortColumn = column;
    this.billSearchService.sortDirection = direction;
  }

  openBillCreationWindow(content) {
    this.resetFormFields()
    this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      () => {
        console.log(this.billCreationDto)
        this.billCrudService.createBill(this.billCreationDto)
          .subscribe((creationResponse) => {
            console.log(creationResponse);
            this.ngOnInit();
          });
      },
      () => {
        console.log("Bill creation canceled")
      }
    );
  }

  resetFormFields() {
    this.billCreationDto.category = null;
    this.billCreationDto.description = null;
    this.billCreationDto.amount = null;
    this.billCreationDto.date = formatDate(Date.now(), "yyyy-MM-dd", "en");
  }

  openDeletionConfirmationWindow(billNumber: number | string, content) {
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
