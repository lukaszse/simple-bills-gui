import {Bill} from "./bill";

export class PageableBills{

  bills: Bill[]
  totalCount: number


  constructor(bills: Bill[], totalCount: number) {
    this.bills = bills;
    this.totalCount = totalCount;
  }
}
