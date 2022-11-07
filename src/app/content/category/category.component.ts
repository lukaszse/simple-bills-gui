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

  category: Category = {
    name: null,
    limit: null
  };

  categories: Category[];
  allowableReplacementCategories: Category[];
  totalLimit: number;
  categoryToDelete: string = null;
  replacementCategory: string = null;

  constructor(private categoryService: CategoryService,
              private _modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.categoryService.findCategories().subscribe(
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
        this.categoryService.createCategory(this.category)
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
    this.category = category;
    this._modalService.open(content, {ariaLabelledBy: 'modal-category-update'}).result.then(
      () => {
        this.categoryService.updateCategory(this.category)
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
    this.categoryToDelete = categoryName;
    this.allowableReplacementCategories = this.categories.filter(category => category.name !== categoryName);
    this._modalService.open(content, {ariaLabelledBy: 'modal-category-deletion'}).result.then(
      (result) => {
        console.log(result);
        this.categoryService.deleteCategory(categoryName, this.replacementCategory)
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
      .map(limit => limit == null ? 0 : limit)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  resetFormFields() {
    this.category.name = null;
    this.category.limit = null;
  }
}
