import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bill} from "../dto/bill";
import {prepareHeaders, prepareUrl} from "../utils/httpClientUtils"

@Injectable({providedIn: "root"})
export class BillsService {

  private static billsEndpoint: string = "/bills";

  constructor(private httpClient: HttpClient) {}

  getBills(): Observable<HttpResponse<Bill>> {
    return this.httpClient.get<Bill>(
      prepareUrl(BillsService.billsEndpoint),
      { headers: prepareHeaders(), observe: 'response' });
  }
}


