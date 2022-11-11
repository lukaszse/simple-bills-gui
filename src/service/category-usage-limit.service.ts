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
  private _findTotalUsageLimit$ = new Subject<void>();
  private _categoryUsageBarChart$ = new BehaviorSubject<CategoryUsageLimitBarChart[][]>(null);
  private _totalUsageLimitBarChart$ = new BehaviorSubject<CategoryUsageLimitBarChart[][]>(null);
  private _loadingCategories$ = new BehaviorSubject<boolean>(true);
  private _loadingTotal$ = new BehaviorSubject<boolean>(true);


  constructor(private httpClient: HttpClient) {

    this._findCategoryUsageLimit$
      .pipe(
        tap(() => this._loadingCategories$.next(true)),
        debounceTime(200),
        switchMap(() => this.findCategoryUsageLimits()),
        tap(() => this._loadingCategories$.next(false))
      )
      .subscribe((result) => {
        this._categoryUsageBarChart$.next(CategoryUsageLimitService.prepareBarCharData(result))
      });

    this._findTotalUsageLimit$
      .pipe(
        tap(() => this._loadingTotal$.next(true)),
        debounceTime(200),
        switchMap(() => this.findCategoryUsageLimits(true)),
        tap(() => this._loadingTotal$.next(false))
      )
      .subscribe((result) => {
        this._totalUsageLimitBarChart$.next(CategoryUsageLimitService.prepareBarCharData(result))
      });
  }

  private findCategoryUsageLimits(total?: boolean): Observable<CategoryUsageLimit[]> {
    const url = HttpUtils.prepareUrl(CategoryUsageLimitService.host, CategoryUsageLimitService.endpoint);
    const completeUrl = total ? `${url}?total=true` : url;
    return this.httpClient.get<CategoryUsageLimitService[]>(completeUrl, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        catchError(HttpUtils.handleError),
        tap(console.log)
      );
  }

  refresh() {
    this._findCategoryUsageLimit$.next();
    this._findTotalUsageLimit$.next()
  }

  get categoryUsageBarChart$() {
    return this._categoryUsageBarChart$.asObservable();
  }

  get totalUsageLimitBarchart$() {
    return this._totalUsageLimitBarChart$.asObservable();
  }

  get loadingCategories$() {
    return this._loadingCategories$.asObservable();
  }

  get loadingTotal$() {
    return this._loadingTotal$.asObservable();
  }

  static prepareBarCharData(categoryUsageLimits: CategoryUsageLimit[]): CategoryUsageLimitBarChart[][] {
    return categoryUsageLimits
      .map(CategoryUsageLimitService.convertToBarChartData);
  }

  static convertToBarChartData(categoryUsageLimit: CategoryUsageLimit): CategoryUsageLimitBarChart[] {
    let remainingLimit = CategoryUsageLimitService.remainingLimit(categoryUsageLimit);
    return [new CategoryUsageLimitBarChart(categoryUsageLimit.categoryName, categoryUsageLimit.usage, remainingLimit, categoryUsageLimit.limit)];
  }

  private static remainingLimit(categoryUsageLimit: CategoryUsageLimit) {
    if (categoryUsageLimit.limit && categoryUsageLimit.usage <= categoryUsageLimit.limit) {
      return categoryUsageLimit.limit - categoryUsageLimit.usage;
    } else {
      return 0;
    }
  }
}
