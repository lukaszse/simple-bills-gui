import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { BehaviorSubject, catchError, debounceTime, Observable, Subject, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CategoryUsageLimit } from "../dto/categoryUsageLimit";
import { HttpUtils } from "../utils/httpClientUtils";
import { CategoryUsagePieChart } from "../dto/categoryUsagePieChart";
import { CurrencyPipe } from "@angular/common";

@Injectable({providedIn: "root"})
export class UsageLimitPieChartService {

  private static host = environment.billPlanHost
  private static endpoint = "/category-usage-limit"

  private _findCategoryUsageLimit$ = new Subject<void>();
  private _findTotalUsageLimit$ = new Subject<void>();
  private _categoryUsagePieChart$ = new BehaviorSubject<CategoryUsagePieChart[]>(null);
  private _loading$ = new BehaviorSubject<boolean>(true);


  constructor(private httpClient: HttpClient, private currencyPipe: CurrencyPipe) {
    this._findCategoryUsageLimit$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this.findCategoryUsageLimits()),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._categoryUsagePieChart$.next(UsageLimitPieChartService.preparePieCharData(result, currencyPipe))
      });
  }

  private findCategoryUsageLimits(total?: boolean): Observable<CategoryUsageLimit[]> {
    const url = HttpUtils.prepareUrl(UsageLimitPieChartService.host, UsageLimitPieChartService.endpoint);
    const completeUrl = total ? `${url}?total=true` : url;
    return this.httpClient.get<UsageLimitPieChartService[]>(completeUrl, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        catchError(HttpUtils.handleError),
        tap(console.log)
      );
  }

  refresh() {
    this._findCategoryUsageLimit$.next();
    this._findTotalUsageLimit$.next()
  }

  get categoryUsagePieChart$() {
    return this._categoryUsagePieChart$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  private static preparePieCharData(categoryUsageLimits: CategoryUsageLimit[],
                                    currencyPipe: CurrencyPipe): CategoryUsagePieChart[] {
    return categoryUsageLimits
      .map(categoryUsageLimit =>
        new CategoryUsagePieChart(UsageLimitPieChartService.prepareCategoryNameLabel(categoryUsageLimit, currencyPipe), categoryUsageLimit.usage));
  }

  private static prepareCategoryNameLabel(categoryUsageLimit: CategoryUsageLimit, currencyPipe: CurrencyPipe): string {
    const formattedUsage: string = currencyPipe.transform(categoryUsageLimit.usage, 'USD', 'symbol', '1.2-2');
    return `${categoryUsageLimit.categoryName} (${formattedUsage})`;
  }
}
