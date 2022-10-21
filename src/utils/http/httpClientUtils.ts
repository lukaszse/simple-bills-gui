import {environment} from "../../environments/environment";
import {HttpHeaders} from "@angular/common/http";
import {Cookie} from "ng2-cookies";

export function prepareUrl(endpoint: string) {
  return `${environment.simpleBillsHost}${endpoint}`;
}

export function prepareHeaders() : HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + Cookie.get('access_token')
  });
}
