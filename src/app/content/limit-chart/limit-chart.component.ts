import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { UserService } from "../../../service/user.service";
import { multi } from "./data";

@Component({
  selector: 'app-limit-chart',
  templateUrl: './limit-chart.component.html',
  styleUrls: ['./limit-chart.component.scss']
})
export class LimitChartComponent implements OnInit {

  loggedUsername: Observable<string>;
  multi: any[];
  view: any[] = [300, 50];

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
  }

  ngOnInit(): void {
    this.loggedUsername = this.getUser();
    Object.assign(this, {multi});
  }

  getUser(): Observable<string> {
    return this.userService
      .getUser()
  }

  onSelect(event) {
    console.log(event);
  }

}
