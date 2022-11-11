import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { BehaviorSubject, catchError, debounceTime, Observable, Subject, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CategoryUsageLimit } from "../dto/categoryUsageLimit";
import { HttpUtils } from "../utils/http/httpClientUtils";
import { CategoryUsagePieChart } from "../dto/categoryUsagePieChart";

@Injectable({providedIn: "root"})
export class UsagePieChartService {

  private static host = environment.billPlanHost
  private static endpoint = "/category-usage-limit"

  private _findCategoryUsageLimit$ = new Subject<void>();
  private _findTotalUsageLimit$ = new Subject<void>();
  private _categoryUsageBarChart$ = new BehaviorSubject<CategoryUsagePieChart[]>(null);
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
        this._categoryUsageBarChart$.next(UsagePieChartService.preparePieCharData(result))
      });
  }

  private findCategoryUsageLimits(total?: boolean): Observable<CategoryUsageLimit[]> {
    const url = HttpUtils.prepareUrl(UsagePieChartService.host, UsagePieChartService.endpoint);
    const completeUrl = total ? `${url}?total=true` : url;
    return this.httpClient.get<UsagePieChartService[]>(completeUrl, {headers: HttpUtils.prepareHeaders()})
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

  get loadingCategories$() {
    return this._loadingCategories$.asObservable();
  }

  get loadingTotal$() {
    return this._loadingTotal$.asObservable();
  }

  private static preparePieCharData(categoryUsageLimits: CategoryUsageLimit[]): CategoryUsagePieChart[] {
    return categoryUsageLimits
      .map(categoryUsageLimit => new CategoryUsagePieChart(categoryUsageLimit.categoryName, categoryUsageLimit.usage));
  }
}
