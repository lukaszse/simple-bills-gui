import {Directive, EventEmitter, Injectable, Input, Output, QueryList} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cookie} from "ng2-cookies";
import {environment} from "../environments/environment";
import {SortableComponent} from "../interfaces/sortableComponent";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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

export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

export class SortUtils {

  public static resetOtherHeaders(headers:  QueryList<NgbdSortableHeader>, column: string) {
    headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    return headers;
  }

  public static sortTable(component: SortableComponent, direction: "asc" | "desc" | "", column: string) {
    if (direction === '' || column === '') {
      return component.getBillsObservable();
    } else {
      return  component.getBillsObservable().pipe(
        map(bills => bills.sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        })));
    }
  }
}



