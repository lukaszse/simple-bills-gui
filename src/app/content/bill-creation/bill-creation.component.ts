import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {formatDate} from "@angular/common";
import {BillCreationDto} from "../../../dto/billCreationDto";

@Component({
  selector: 'app-bill-creation',
  templateUrl: './bill-creation.component.html',
  styleUrls: ['./bill-creation.component.scss']
})
export class BillCreationComponent {

  billCreationDto : BillCreationDto;

  constructor(private modalService: NgbModal) {
  }

  open(content) {
    this.resetFormFields()
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  createBill() {

  }

  resetFormFields() {
    this.billCreationDto.category = null;
    this.billCreationDto.description = null;
    this.billCreationDto.amount = null;
    this.billCreationDto.date = formatDate(Date.now(), "yyyy-MM-dd", "en");
  }
}
