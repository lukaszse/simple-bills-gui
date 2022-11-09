import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DatePipe, DecimalPipe, formatDate } from "@angular/common";
import { NgbdSortableHeader, SortEvent, SortUtils } from "../../../utils/sortableComponents/sortable.directive";
import { TransactionSearchService } from "../../../service/transaction-search.service";
import { TransactionCrudService } from "../../../service/transaction-crud.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TransactionDto } from "../../../dto/transactionDto";
import { Category } from "../../../dto/category";
import { CategoryService } from "../../../service/category.service";
import { Transaction, Type } from "../../../dto/transaction";
import { BalanceService } from "../../../service/balance.service";


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  providers: [DecimalPipe, DatePipe]
})
export class TransactionsComponent implements OnInit {

  transactionDto: TransactionDto = {
    transactionNumber: null,
    type: null,
    category: null,
    description: null,
    amount: null,
    date: null
  };

  category: Category = {
    name: null,
    transactionType: null,
    limit: null
  };

  selectedTransaction: string | number;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public transactionSearchService: TransactionSearchService,
              public categoryService: CategoryService,
              public balanceService: BalanceService,
              private transactionCrudService: TransactionCrudService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.transactionSearchService.refresh();
    this.balanceService.refresh();
  }

  onSort({column, direction}: SortEvent) {
    this.headers = SortUtils.resetOtherHeaders(this.headers, column);
    this.transactionSearchService.sortColumn = column;
    this.transactionSearchService.sortDirection = direction;
  }

  openTransactionCreationWindow(transactionType: string, content) {
    this.resetFormFields(Type[transactionType])
    this.modalService.open(content, {ariaLabelledBy: 'modal-transaction-creation'}).result.then(
      () => {
        console.log(this.transactionDto)
        this.transactionCrudService.createTransaction(this.transactionDto)
          .subscribe((creationResponse) => {
            console.log(creationResponse);
            this.ngOnInit();
          });
      },
      () => {
        console.log(`Transaction (${transactionType}) creation canceled`)
      }
    );
  }

  openTransactionEditWindow(transaction: Transaction, content) {
    this.selectedTransaction = transaction.transactionNumber;
    this.setFormFields(transaction)
    this.modalService.open(content, {ariaLabelledBy: 'modal-transaction-update'}).result.then(
      () => {
        const transactionToUpdate: Transaction = this.updateBill(transaction);
        console.log(this.transactionDto)
        this.transactionCrudService.updateTransaction(transactionToUpdate)
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

  openDeletionConfirmationWindow(transactionNumber: number | string, content) {
    this.selectedTransaction = transactionNumber;
    this.modalService.open(content, {ariaLabelledBy: "modal-transaction-deletion"}).result.then(
      () => {
        console.log(transactionNumber);
        return this.transactionCrudService.deleteBill(transactionNumber)
          .subscribe(console.log);
      },
      () => {
        console.log("Transaction deletion canceled")
      }
    );
  }

  resetFormFields(transactionType: Type) {
    this.transactionDto.type = transactionType;
    this.transactionDto.category = null;
    this.transactionDto.description = null;
    this.transactionDto.amount = null;
    this.transactionDto.date = formatDate(Date.now(), "yyyy-MM-dd", "en");
  }

  setFormFields(transaction: Transaction) {
    this.transactionDto.transactionNumber = transaction.transactionNumber
    this.transactionDto.type = transaction.type;
    this.transactionDto.category = transaction.category;
    this.transactionDto.description = transaction.description;
    this.transactionDto.amount = transaction.amount;
    this.transactionDto.date = formatDate(transaction.date, "yyyy-MM-dd", "en");
  }

  updateBill(transaction: Transaction): Transaction {
    transaction.type = this.transactionDto.type;
    transaction.category = this.transactionDto.category;
    transaction.description = this.transactionDto.description;
    transaction.amount = this.transactionDto.amount;
    transaction.date = this.transactionDto.date;
    return transaction;
  }
}
