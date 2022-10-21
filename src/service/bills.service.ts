import {Injectable, PipeTransform} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Bill} from "../dto/bill";
import {prepareHeaders, prepareUrl} from "../utils/http/httpClientUtils"
import {map} from "rxjs/operators";
import {DatePipe} from "@angular/common";

@Injectable({providedIn: "root"})
export class BillsService {

  private static billsEndpoint: string = "/bills";

  constructor(private httpClient: HttpClient) {}

  getBills(): Observable<Bill[]> {
    return this.httpClient.get<Bill>(
      prepareUrl(BillsService.billsEndpoint),
      { headers: prepareHeaders(), observe: 'response' })
      .pipe(
        tap(console.log),
        map(response => response.body));
  }

  static search(bills: Observable<Bill[]>,
                  text: string,
                  decimalPipe: PipeTransform,
                  datePipe: DatePipe): Observable<Bill[]> {
    return bills.pipe(
      map(bill => bill.filter(bill => {
        const term = text.toLowerCase();
        return decimalPipe.transform(bill.billNumber).includes(term)
          || datePipe.transform(bill.date).includes(term)
          || decimalPipe.transform(bill.amount).includes(term)
          || bill.description.toLowerCase().includes(term)
          || bill.category.toLowerCase().includes(term)
      }))
    )
  }
}



