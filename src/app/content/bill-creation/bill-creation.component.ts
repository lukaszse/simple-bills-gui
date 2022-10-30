import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {formatDate} from "@angular/common";
import {BillCreationDto} from "../../../dto/billCreationDto";
import {BillsCrudService} from "../../../service/bills-crud.service";

@Component({
  selector: 'app-bill-creation',
  templateUrl: './bill-creation.component.html',
  styleUrls: ['./bill-creation.component.scss']
})
export class BillCreationComponent {

  billCreationDto: BillCreationDto = {
    category: null,
    description: null,
    amount: null,
    date: null
  };

  constructor(private billSearchService: BillsCrudService,
              private modalService: NgbModal) {
  }

  open(content) {
    this.resetFormFields()
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      () => {
        console.log(this.billCreationDto)
        this.billSearchService.createBill(this.billCreationDto)
          .subscribe(console.log);
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
}
