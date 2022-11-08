import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DatePipe, DecimalPipe, formatDate } from "@angular/common";
import { NgbdSortableHeader, SortEvent, SortUtils } from "../../../utils/sortableComponents/sortable.directive";
import { BillsSearchService } from "../../../service/bills-search.service";
import { BillsCrudService } from "../../../service/bills-crud.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BillDto } from "../../../dto/billDto";
import { Category } from "../../../dto/category";
import { CategoryService } from "../../../service/category.service";
import { Bill } from "../../../dto/bill";
import { BalanceService } from "../../../service/balance.service";


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  providers: [DecimalPipe, DatePipe]
})
export class BillsComponent implements OnInit {

  billDto: BillDto = {
    category: null,
    description: null,
    amount: null,
    date: null
  };

  category: Category = {
    name: null,
    limit: null
  };

  billToDelete: string | number;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public billSearchService: BillsSearchService,
              public categoryService: CategoryService,
              public balanceService: BalanceService,
              private billCrudService: BillsCrudService,
              private _modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.billSearchService.refresh();
    this.balanceService.refresh();
  }

  onSort({column, direction}: SortEvent) {
    this.headers = SortUtils.resetOtherHeaders(this.headers, column);
    this.billSearchService.sortColumn = column;
    this.billSearchService.sortDirection = direction;
  }

  openBillCreationWindow(content) {
    this.resetFormFields()
    this._modalService.open(content, {ariaLabelledBy: 'modal-bill-creation'}).result.then(
      () => {
        console.log(this.billDto)
        this.billCrudService.createBill(this.billDto)
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

  openBillUpdateWindow(bill: Bill, content) {
    this.setFormFields(bill)
    this._modalService.open(content, {ariaLabelledBy: 'modal-bill-update'}).result.then(
      () => {
        const billToUpdate: Bill = this.updateBill(bill);
        console.log(this.billDto)
        this.billCrudService.updateBill(billToUpdate)
          .subscribe((creationResponse) => {
            console.log(creationResponse);
            this.ngOnInit();
          });
      },
      () => {
        console.log("Bill update canceled")
      }
    );
  }

  openDeletionConfirmationWindow(billNumber: number | string, content) {
    this.billToDelete = billNumber;
    this._modalService.open(content, {ariaLabelledBy: "modal-bill-deletion"}).result.then(
      () => {
        console.log(billNumber);
        return this.billCrudService.deleteBill(billNumber)
          .subscribe(console.log);
      },
      () => {
        console.log("Bill deletion canceled")
      }
    );
  }

  resetFormFields() {
    this.billDto.category = null;
    this.billDto.description = null;
    this.billDto.amount = null;
    this.billDto.date = formatDate(Date.now(), "yyyy-MM-dd", "en");
  }

  setFormFields(bill: Bill) {
    this.billDto.category = bill.category;
    this.billDto.description = bill.description;
    this.billDto.amount = bill.amount;
    this.billDto.date = formatDate(bill.date, "yyyy-MM-dd", "en");
  }

  updateBill(bill: Bill): Bill {
    bill.category = this.billDto.category;
    bill.description = this.billDto.description;
    bill.amount = this.billDto.amount;
    bill.date = this.billDto.date;
    return bill;
  }
}
