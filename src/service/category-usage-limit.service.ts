import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { BehaviorSubject, catchError, debounceTime, Observable, Subject, switchMap, tap } from "rxjs";
import { CategoryUsageLimit } from "../dto/categoryUsageLimit";
import { HttpUtils } from "../utils/http/httpClientUtils";
import { Injectable } from "@angular/core";
import { CategoryUsageLimitBarChart } from "../app/content/limit-chart/categoryUsageLimitBarChart";

@Injectable({providedIn: "root"})
export class CategoryUsageLimitService {

  private static host = environment.billPlanHost
  private static endpoint = "/category-usage-limit"

  private _findCategoryUsageLimit$ = new Subject<void>();
  private _categoryUsageLimit$ = new BehaviorSubject<CategoryUsageLimit[]>(null);
  private _categoryUsageBarchart$ = new BehaviorSubject<CategoryUsageLimitBarChart[][]>(null);
  private _loading$ = new BehaviorSubject<boolean>(true);

  constructor(private httpClient: HttpClient) {
    this._findCategoryUsageLimit$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this.findCategoryUsageLimits()),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._categoryUsageLimit$.next(result);
        this._categoryUsageBarchart$.next(CategoryUsageLimitService.prepareBarCharData(result))
      })
  }

  private findCategoryUsageLimits(): Observable<CategoryUsageLimit[]> {
    const url = HttpUtils.prepareUrl(CategoryUsageLimitService.host, CategoryUsageLimitService.endpoint);
    return this.httpClient.get<CategoryUsageLimitService[]>(url, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        catchError(HttpUtils.handleError),
        tap(console.log)
      );
  }

  refresh() {
    this._findCategoryUsageLimit$.next();
  }

  get categoryUsageLimit$() {
    return this._categoryUsageLimit$.asObservable();
  }

  get categoryUsageBarchart$() {
    return this._categoryUsageBarchart$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  static prepareBarCharData(categoryUsageLimits: CategoryUsageLimit[]): CategoryUsageLimitBarChart[][] {
    return categoryUsageLimits
      .map(CategoryUsageLimitService.convertToBarChartData);
  }

  static convertToBarChartData(categoryUsageLimit: CategoryUsageLimit): CategoryUsageLimitBarChart[] {
    return [new CategoryUsageLimitBarChart(categoryUsageLimit.categoryName, categoryUsageLimit.usage, categoryUsageLimit.limit)];
  }
}
