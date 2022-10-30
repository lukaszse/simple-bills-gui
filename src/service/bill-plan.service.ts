import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

@Injectable({providedIn: "root"})
export class BillPlanService {

  private static host = environment.billPlanHost
  private static endpoint = "/billPlans"
}
