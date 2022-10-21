import {Bill} from "./bill";

export interface Pageable<Bill> {

  bills: Bill[];
  totalCount: number;
}
