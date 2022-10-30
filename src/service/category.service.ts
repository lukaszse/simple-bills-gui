import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap } from "rxjs";
import { HttpUtils } from "../utils/http/httpClientUtils";
import { map } from "rxjs/operators";
import { Category } from "../dto/category";

@Injectable({providedIn: "root"})
export class CategoryService {

  private static host = environment.billPlanHost
  private static endpoint = "/categories"

  constructor(private httpClient: HttpClient) {
  }

  createCategory(category: Category): Observable<string | Object> {
    const url = HttpUtils.prepareUrl(CategoryService.host, CategoryService.endpoint);
    return this.httpClient
      .post<string>(url, category, {headers: HttpUtils.prepareHeaders(), observe: 'response'})
      .pipe(
        map((response) => response.body),
        tap(body => console.log(`Category with name ${body} created.`)),
        catchError(HttpUtils.handleError)
      )
  }

  getCategories(): Observable<Category[]> {
    const url = HttpUtils.prepareUrl(CategoryService.host, CategoryService.endpoint);
    return this.httpClient.get<Category[]>(url, {headers: HttpUtils.prepareHeaders(), observe: 'response'})
      .pipe(
        map((response) => response.body),
        catchError(HttpUtils.handleError),
        tap(console.log)
      );
  }
}
