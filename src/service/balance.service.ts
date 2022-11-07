import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Balance } from "../dto/balance";
import { catchError, Observable, tap } from "rxjs";
import { HttpUtils } from "../utils/http/httpClientUtils";
import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class BalanceService {

  private static host = environment.billPlanHost
  private static endpoint = "/balance"

  constructor(private httpClient: HttpClient) {
  }

  findBalance(): Observable<Balance> {
    const url = HttpUtils.prepareUrl(BalanceService.host, BalanceService.endpoint);
    return this.httpClient.get<Balance>(url, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        catchError(HttpUtils.handleError),
        tap(console.log)
      );
  }
}
