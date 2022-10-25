import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpUtils} from "../utils/http/httpClientUtils";
import {BillCreationDto} from "../dto/billCreationDto";
import {map} from "rxjs/operators";
import {catchError, Observable, tap} from "rxjs";

@Injectable({providedIn: "root"})
export class BillsCrudService {

  private static billsEndpoint: string = "/bills";

  constructor(private httpClient: HttpClient) {
  }

  createBill(bill: BillCreationDto): Observable<number | Object> {
    const url = HttpUtils.prepareUrl(BillsCrudService.billsEndpoint);
    return this.httpClient
      .post(url, bill, {headers: HttpUtils.prepareHeaders(), observe: 'response'})
      .pipe(
        map((response) => response.body),
        tap(body => console.log(`Bill with number ${body} created.`)),
        catchError(HttpUtils.handleError)
      )
  }

  deleteBill(billNumber: number | string) : Observable<number | Object> {
    const url = `${HttpUtils.prepareUrlWithId(BillsCrudService.billsEndpoint, billNumber)}`;
    return this.httpClient
      .delete(url, {headers: HttpUtils.prepareHeaders(), observe: "response"})
      .pipe(
        map((response) => response.body),
        tap(() => console.log(`Bill with number ${billNumber} deleted.`)),
        catchError(HttpUtils.handleError)
      )
  }
}
