import { Component, OnInit } from '@angular/core';
import { Category } from "../../../dto/category";
import { CategoryService } from "../../../service/category.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryToCreate: Category = {
    name: null,
    limit: null
  };

  categoryToUpdate: Category = {
    name: null,
    limit: null
  };

  categories: Category[];
  categoryToRemove: string;

  constructor(private categoryService: CategoryService,
              private _modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
  }

  openCreationWindow(content) {
    this.resetFormFields()
    this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      () => {
        this.categoryService.createCategory(this.categoryToCreate)
          .subscribe((deletionResponse) => {
            console.log(deletionResponse);
            this.ngOnInit();
          });
      },
      () => {
        console.log("Exit `category management` without any action.")
      }
    );
  }

  openUpdateWindow(content) {
    this.resetFormFields()
    this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      () => {
        this.categoryService.updateCategory(this.categoryToUpdate)
          .subscribe()
        this.ngOnInit();
      },
      () => {
        console.log("Exit `category management` without any action.")
      }
    );
  }

  openDeletionWindow(content) {
    this.resetFormFields()
    this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      () => {
        this.categoryService.deleteCategory(this.categoryToRemove)
          .subscribe((deletionResponse) => {
            console.log(deletionResponse);
            this.ngOnInit();
          });
      },
      () => {
        console.log("Exit `category management` without any action.")
      }
    );
  }

  openDeletionConfirmationWindow(categoryName: string, content) {
    this._modalService.open(content).result.then(
      (result) => {
        console.log(result);
        this.categoryService.deleteCategory(categoryName)
          .subscribe((deletionResponse) => {
            console.log(deletionResponse);
            this.ngOnInit();
          });
      },
      (result) => {
        console.log(result);
      }
    );
  }

  resetFormFields() {
    this.categoryToCreate.name = null;
    this.categoryToCreate.limit = null;
    this.categoryToUpdate.name = null
    this.categoryToUpdate.limit = null
  }
}
