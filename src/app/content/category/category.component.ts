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
  totalLimit: number;
  categoryToRemove: string;

  constructor(private categoryService: CategoryService,
              private _modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        this.totalLimit = CategoryComponent.countTotalLimit(categories);
      }
    );
  }

  openCreationWindow(content) {
    this.resetFormFields()
    this._modalService.open(content, {ariaLabelledBy: 'modal-category-creation'}).result.then(
      () => {
        this.categoryService.createCategory(this.categoryToCreate)
          .subscribe((deletionResponse) => {
            console.log(deletionResponse);
            this.ngOnInit();
          });
      },
      () => {
        console.log("Exit without any action.")
      }
    );
  }

  openUpdateWindowForSelectedCategory(category: Category, content) {
    this.categoryToUpdate = category;
    this._modalService.open(content, {ariaLabelledBy: 'modal-category-update'}).result.then(
      () => {
        this.categoryService.updateCategory(this.categoryToUpdate)
          .subscribe((updateResponse) => {
            console.log(updateResponse);
            this.ngOnInit();
          });
      },
      () => {
        console.log("Exit without any action.")
      }
    );
  }

  openDeletionConfirmationWindow(categoryName: string, content) {
    console.log(this.categoryToRemove)
    this._modalService.open(content, {ariaLabelledBy: 'modal-category-deletion'}).result.then(
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

  private static countTotalLimit(categories: Category[]): number {
    return categories
      .map((category) => category.limit)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  resetFormFields() {
    this.categoryToCreate.name = null;
    this.categoryToCreate.limit = null;
    this.categoryToUpdate.name = null
    this.categoryToUpdate.limit = null
  }
}
