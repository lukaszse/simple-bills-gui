import {Observable} from "rxjs";

export interface SortableComponent{

  getBillsObservable(): Observable<any>
}
