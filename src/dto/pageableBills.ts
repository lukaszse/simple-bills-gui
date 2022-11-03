import { Bill } from "./bill";

export class PageableBills {

  bills: Bill[]
  totalCount: number
  pageTotalAmount: number

  constructor(bills: Bill[], totalCount: number, totalAmount?: number) {
    this.bills = bills;
    this.totalCount = totalCount;
    this.pageTotalAmount = totalAmount;
  }
}
