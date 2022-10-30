import { Component } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Category } from "../../../dto/category";
import { CategoryService } from "../../../service/category.service";

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.scss']
})
export class CategoryCreationComponent {

  public categories$;

  category: Category = {
    name: null
  };

  constructor(private categoryService: CategoryService,
              private modalService: NgbModal) {
    this.categories$ = this.categoryService.getCategories();
  }

  open(content) {
    this.resetFormFields()
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      () => {
        console.log(this.category)
        this.categoryService.createCategory(this.category)
          .subscribe(console.log);
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
