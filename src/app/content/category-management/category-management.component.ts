import { Component } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Category } from "../../../dto/category";
import { CategoryService } from "../../../service/category.service";

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent {

  category: Category = {
    name: null,
    limit: null
  };

  categories$;
  categoryToRemove: string;
  categoryToUpdate: Category;

  constructor(private categoryService: CategoryService,
              private modalService: NgbModal) {
    this.categories$ = this.categoryService.getCategories();
  }

  open(content) {
    this.resetFormFields()
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        console.log(`${result} ${this.category.name}`)
        if (result === "remove category") {
          this.categoryService.deleteCategory(this.categoryToRemove)
            .subscribe()
        }
        if (result === "add category") {
          this.categoryService.createCategory(this.category)
            .subscribe();
        }
      },
      () => {
        console.log("Bill creation canceled")
      }
    );
  }

  resetFormFields() {
    this.category.name = null;
  }
}
