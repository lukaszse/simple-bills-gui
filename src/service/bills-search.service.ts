import {Injectable, PipeTransform} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, debounceTime, Observable, Subject, switchMap, tap} from "rxjs";
import {Bill} from "../dto/bill";
import {map} from "rxjs/operators";
import {DatePipe, DecimalPipe} from "@angular/common";
import {PageableBills} from "../dto/pageableBills";
import {SortableState, SortDirection} from "../utils/sortableComponents/sortable.directive";
import {HttpUtils} from "../utils/http/httpClientUtils";


@Injectable({providedIn: "root"})
export class BillsSearchService {

  private static billsEndpoint: string = "/bills";
  private _pageableBills$ = new BehaviorSubject<PageableBills>(null);
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>()

  private _state: SortableState = {
    sortColumn: '',
    sortDirection: '',
    pageNumber: 1,
    pageSize: 4,
    searchTerm: '',
    dateFrom: null,
    dateTo: null
  };

  constructor(private httpClient: HttpClient, private decimalPipe: DecimalPipe, private datePipe: DatePipe) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        tap(() => this._loading$.next(false)),
      )
      .subscribe(
        (result) => {
          this._pageableBills$.next(result);
        });
    this._search$.next();
  }

  private getBills(pageSize: number,
                   pageNumber: number,
                   sortDirection: string,
                   sortColumn: string,
                   dateFrom: Date,
                   dateTo: Date): Observable<PageableBills> {

    let url = HttpUtils.prepareUrl(BillsSearchService.billsEndpoint, pageSize, pageNumber, sortDirection, sortColumn, dateFrom, dateTo);
    return this.httpClient.get<Bill[]>(url, {headers: HttpUtils.prepareHeaders(), observe: 'response'})
      .pipe(
        map((response) => {
          return new PageableBills(response.body, Number(response.headers.get(HttpUtils.X_TOTAL_COUNT)));
        }),
        catchError(HttpUtils.handleError),
        tap(console.log)
      );
  }

  private _search(): Observable<PageableBills> {
    const {sortColumn, sortDirection, pageSize, pageNumber, searchTerm, dateFrom, dateTo} = this._state;
    let pageableBills$ = this.getBills(pageSize, pageNumber, sortDirection, sortColumn, dateFrom, dateTo).pipe()
    pageableBills$ = BillsSearchService.search(pageableBills$, searchTerm, this.decimalPipe, this.datePipe)
    return pageableBills$;
  }

  private static search(bills: Observable<PageableBills>,
                        text: string,
                        decimalPipe: PipeTransform,
                        datePipe: DatePipe): Observable<PageableBills> {
    return bills.pipe(
      map(pageableBill => {
        const bills = this.matchBills(pageableBill, text, decimalPipe, datePipe);
        return new PageableBills(bills, pageableBill.totalCount);
      }))
  }

  private static matchBills(pageableBill: PageableBills, text: string, decimalPipe: PipeTransform, datePipe: DatePipe) {
    return pageableBill.bills.filter(bill => {
      const term = text.toLowerCase();
      return decimalPipe.transform(bill.billNumber).includes(term)
        || datePipe.transform(bill.date).includes(term)
        || decimalPipe.transform(bill.amount).includes(term)
        || bill.description.toLowerCase().includes(term)
        || bill.category.toLowerCase().includes(term);
    });
  }

  // getters and setters to wrapped objects
  get pageableBills$() {
    return this._pageableBills$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.pageNumber;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  get dateFrom() {
    return this._state.dateFrom;
  }

  get dateTo() {
    return this._state.dateTo;
  }

  set page(page: number) {
    this._set({pageNumber: page});
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set sortColumn(sortColumn: string) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  set dateFrom(dateFrom: Date) {
    this._set({dateFrom});
  }

  set dateTo(dateTo: Date) {
    this._set({dateTo});
  }

  private _set(patch: Partial<SortableState>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
}
