import {Injectable, PipeTransform} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Bill} from "../dto/bill";
import {prepareHeaders, prepareUrl} from "../utils/http/httpClientUtils"
import {map} from "rxjs/operators";
import {DatePipe} from "@angular/common";
import {PageableBills} from "../dto/pageableBills";

@Injectable({providedIn: "root"})
export class BillsService {

  private static billsEndpoint: string = "/bills";

  constructor(private httpClient: HttpClient) {
  }

  getBills(): Observable<PageableBills> {
    return this.httpClient.get<Bill>(
      prepareUrl(BillsService.billsEndpoint),
      {headers: prepareHeaders(), observe: 'response'})
      .pipe(
        tap(console.log),
        map(response => new PageableBills(response.body, response.headers.get('x-total-count'))),
        tap(console.log));
  }

  static search(bills: Observable<PageableBills>,
                text: string,
                decimalPipe: PipeTransform,
                datePipe: DatePipe): Observable<PageableBills> {
    return bills.pipe(
      map(pageableBill => {
        const bills = this.searchBills(pageableBill, text, decimalPipe, datePipe);
        return new PageableBills(bills, pageableBill.totalCount);
      }))
  }

  private static searchBills(pageableBill: PageableBills, text: string, decimalPipe: PipeTransform, datePipe: DatePipe) {
    return pageableBill.bills.filter(bill => {
      const term = text.toLowerCase();
      return decimalPipe.transform(bill.billNumber).includes(term)
        || datePipe.transform(bill.date).includes(term)
        || decimalPipe.transform(bill.amount).includes(term)
        || bill.description.toLowerCase().includes(term)
        || bill.category.toLowerCase().includes(term);
    });
  }
}



