import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { UserService } from "../../../service/user.service";
import { multi } from "./data";

@Component({
  selector: 'app-limit-charts',
  templateUrl: './limit-charts.component.html',
  styleUrls: ['./limit-charts.component.scss']
})
export class LimitChartsComponent implements OnInit {

  loggedUsername: Observable<string>;
  multi: any[];
  view: any[] = [200, 300];

  // options
  showXAxis: boolean = false;
  showYAxis: boolean = false;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Normalized Population';

  colorScheme = {
    domain: ['#A10A28', '#AAAAAA'],
  };

  constructor(private userService: UserService) {
    Object.assign(this, {multi});
  }

  ngOnInit(): void {
    this.loggedUsername = this.getUser();
  }

  getUser(): Observable<string> {
    return this.userService
      .getUser()
  }

  onSelect(event) {
    console.log(event);
  }

}
