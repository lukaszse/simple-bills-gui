import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BillCreationDto } from "../dto/billCreationDto";
import { catchError, Observable, tap } from "rxjs";
import { HttpUtils } from "../utils/http/httpClientUtils";
import { map } from "rxjs/operators";

@Injectable({providedIn: "root"})
export class CategoryService {

  private static host = environment.billPlanHost
  private static endpoint = "/categories"

  constructor(private httpClient: HttpClient) {
  }

  createBill(bill: BillCreationDto): Observable<number | Object> {
    const url = HttpUtils.prepareUrl(CategoryService.host, CategoryService.endpoint);
    return this.httpClient
      .post(url, bill, {headers: HttpUtils.prepareHeaders(), observe: 'response'})
      .pipe(
        map((response) => response.body),
        tap(body => console.log(`Bill with number ${body} created.`)),
        catchError(HttpUtils.handleError)
      )
  }
}
