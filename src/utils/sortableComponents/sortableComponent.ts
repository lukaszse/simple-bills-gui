import {Observable} from "rxjs";

export interface SortableComponent{

  getSortableElements(): Observable<any>
}
