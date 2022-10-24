import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpUtils} from "../utils/http/httpClientUtils";
import {BillCreationDto} from "../dto/billCreationDto";
import {map} from "rxjs/operators";
import {catchError, Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class BillsCreationService {

  private static billsEndpoint: string = "/bills";

  constructor(private httpClient: HttpClient) {
  }

  createBill(body: BillCreationDto): Observable<number | Object> {
    const url = HttpUtils.prepareUrl(BillsCreationService.billsEndpoint);
    return this.httpClient
      .post(url, body, {headers: HttpUtils.prepareHeaders(), observe: 'response'})
      .pipe(
        map((response) => response.body),
        catchError(HttpUtils.handleError)
      )
  }
}
