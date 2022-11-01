import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpUtils } from "../utils/http/httpClientUtils";
import { BillCreation } from "../dto/billCreation";
import { map } from "rxjs/operators";
import { catchError, Observable, tap } from "rxjs";
import { BillsSearchService } from "./bills-search.service";
import { environment } from "../environments/environment";

@Injectable({providedIn: "root"})
export class BillsCrudService {

  private static host: string = environment.billHost;
  private static endpoint: string = "/bills";

  constructor(private httpClient: HttpClient, private billSearchService: BillsSearchService) {
  }

  createBill(bill: BillCreation): Observable<string | Object> {
    const url = HttpUtils.prepareUrl(BillsCrudService.host, BillsCrudService.endpoint);
    return this.httpClient
      .post(url, bill, {headers: HttpUtils.prepareHeaders(), observe: 'response'})
      .pipe(
        map((response) => response.body),
        tap(body => console.log(`Bill with number ${body} created.`)),
        catchError(HttpUtils.handleError)
      )
  }

  deleteBill(billNumber: number | string): Observable<number | Object> {
    const url = `${HttpUtils.prepareUrlWithId(BillsCrudService.host, BillsCrudService.endpoint, billNumber)}`;
    return this.httpClient
      .delete(url, {headers: HttpUtils.prepareHeaders(), observe: "response"})
      .pipe(
        map((response) => response.body),
        tap(() => console.log(`Bill with number ${billNumber} deleted.`)),
        tap(() => this.billSearchService.refresh()),
        catchError(HttpUtils.handleError)
      )
  }
}
