import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpUtils} from "../utils/http/httpClientUtils";
import {BillCreationDto} from "../dto/billCreationDto";
import {map} from "rxjs/operators";
import {catchError, Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class BillsCreationService {

  createBill$: Observable<number | Object>

  constructor(private httpClient: HttpClient) {}

  get(endpoint: string, body: BillCreationDto): Observable<number | Object> {
    const url = HttpUtils.prepareUrl(endpoint);
    return this.httpClient
      .post(url, body, {headers: HttpUtils.prepareHeaders(), observe: 'response'})
      .pipe(
        map((response) => response.body),
        catchError(HttpUtils.handleError)
      )
  }
}
