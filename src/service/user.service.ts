import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Bill } from "../dto/bill";
import { HttpUtils } from "../utils/http/httpClientUtils";
import { environment } from "../environments/environment";


@Injectable({providedIn: "root"})
export class UserService {

  private static host: string = environment.simpleBillsHost;
  private static userEndpoint: string = "/user/user-info";

  constructor(private httpClient: HttpClient) {
  }

  getUser(): Observable<HttpResponse<Bill>> {
    return this.httpClient.get<Bill>(
      HttpUtils.prepareUrl(UserService.host, UserService.userEndpoint),
      {headers: HttpUtils.prepareHeaders(), observe: 'response'});
  }
}
