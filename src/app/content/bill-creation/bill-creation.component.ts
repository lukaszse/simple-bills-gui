import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-bill-creation',
  templateUrl: './bill-creation.component.html',
  styleUrls: ['./bill-creation.component.scss']
})
export class BillCreationComponent {

  public category: string;
  public description: string;
  public amount: number;
  public date: string;

  constructor(private modalService: NgbModal) {
  }

  open(content) {
    this.category = null;
    this.description = null;
    this.amount = null;
    this.date = formatDate(Date.now(), "yyyy-MM-dd", "en");
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  processForm() {
    this.modalService.dismissAll("Close");
    console.log(`Processed values: ${this.category}, ${this.description}, ${this.amount}, ${this.date}`);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
