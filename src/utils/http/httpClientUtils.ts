import {environment} from "../../environments/environment";
import {HttpHeaders} from "@angular/common/http";
import {Cookie} from "ng2-cookies";


export class HttpUtils {

  public static X_TOTAL_COUNT = 'x-total-count';
  public static PAGE_SIZE = "pageSize"
  public static PAGE_NUMBER = "pageNumber"


  public static prepareUrl(endpoint: string): string;
  public static prepareUrl(endpoint: string, pageSize: number): string;
  public static prepareUrl(endpoint: string, pageSize: number, pageNumber: number): string;
  public static prepareUrl(endpoint: string, pageSize?: number, pageNumber?: number): string {
    let url = `${environment.simpleBillsHost}${endpoint}`;
    const queryParams: string [] = [];
    if (pageSize) {
      queryParams.push(HttpUtils.getUrlParam(this.PAGE_SIZE, pageSize.toString()))
    }
    if (pageNumber) {
      queryParams.push(HttpUtils.getUrlParam(this.PAGE_NUMBER, pageNumber.toString()))
    }
    return queryParams.length === 0 ?
      url : `${url}?${queryParams.join("&")}`;
  }

  public static prepareHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cookie.get('access_token')
    });
  }

  private static getUrlParam(paramName: string, paramValue: string): string {
    return `${paramName}=${paramValue}`;
  }
}


