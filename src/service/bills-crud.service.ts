import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpUtils } from "../utils/http/httpClientUtils";
import { BillDto } from "../dto/billDto";
import { catchError, Observable, tap } from "rxjs";
import { BillsSearchService } from "./bills-search.service";
import { environment } from "../environments/environment";
import { Bill } from "../dto/bill";

@Injectable({providedIn: "root"})
export class BillsCrudService {

  private static host: string = environment.billHost;
  private static endpoint: string = "/bills";

  constructor(private httpClient: HttpClient, private billSearchService: BillsSearchService) {
  }

  createBill(bill: BillDto): Observable<string | Object> {
    const url = HttpUtils.prepareUrl(BillsCrudService.host, BillsCrudService.endpoint);
    return this.httpClient
      .post<string>(url, bill, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        tap(strResponse => console.log(`Bill with number ${strResponse} created.`)),
        catchError(HttpUtils.handleError)
      )
  }

  updateBill(bill: Bill): Observable<Bill> {
    const url = `${HttpUtils.prepareUrlWithId(BillsCrudService.host, BillsCrudService.endpoint, bill.billNumber)}`;
    return this.httpClient
      .patch<Bill>(url, bill, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        tap((updatedBill) => console.log(`Bill with billNumber=${updatedBill.billNumber} updated.`)),
        tap(() => this.billSearchService.refresh()),
        catchError(HttpUtils.handleError)
      )
  }

  deleteBill(billNumber: number | string): Observable<number | Object> {
    const url = `${HttpUtils.prepareUrlWithId(BillsCrudService.host, BillsCrudService.endpoint, billNumber)}`;
    return this.httpClient
      .delete<string>(url, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        tap(() => console.log(`Bill with number ${billNumber} deleted.`)),
        tap(() => this.billSearchService.refresh()),
        catchError(HttpUtils.handleError)
      )
  }
}
