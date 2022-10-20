import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cookie} from "ng2-cookies";
import {environment} from "../environments/environment";

@Injectable({providedIn: "root"})
export class SimpleBillsClientService {


  constructor(private httpClient: HttpClient) {}

  get(endpoint: string) {
    return this.httpClient
      .get(SimpleBillsClientService.prepareUrl(endpoint), SimpleBillsClientService.prepareHttpOptions())
  }

  private static prepareHttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ Cookie.get('access_token')
      })
    };
    console.log(httpOptions)
    return httpOptions;
  }

  private static prepareUrl(endpoint: string) {
    return `${environment.simpleBillsHost}${endpoint}`;
  }
}



