import { Component } from '@angular/core';
import { Category } from "../../../dto/category";
import { CategoryService } from "../../../service/category.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-category',
  templateUrl: './contact.component.html',
  styleUrls: ['./category.component.css']
})
export class ContactComponent {

  categoryToCreate: Category = {
    name: null,
    limit: null
  };

  categoryToUpdate: Category = {
    name: null,
    limit: null
  };

  categories$;
  categoryToRemove: string;

  constructor(private categoryService: CategoryService,
              private modalService: NgbModal) {
    this.categories$ = this.categoryService.getCategories();
  }

  open(content) {
    this.resetFormFields()
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        if (result === "add category") {
          this.categoryService.createCategory(this.categoryToCreate)
            .subscribe();
        }
        if (result === "update category") {
          this.categoryService.updateCategory(this.categoryToUpdate)
            .subscribe()
        }
        if (result === "remove category") {
          this.categoryService.deleteCategory(this.categoryToRemove)
            .subscribe()
        }
      },
      () => {
        console.log("Exit `category management` without any action.")
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
