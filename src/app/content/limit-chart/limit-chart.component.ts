import { Component, OnInit } from '@angular/core';
import { multi } from "./data";
import { CategoryUsageLimitService } from "../../../service/category-usage-limit.service";

@Component({
  selector: 'app-limit-chart',
  templateUrl: './limit-chart.component.html',
  styleUrls: ['./limit-chart.component.scss']
})
export class LimitChartComponent implements OnInit {


  multi: any[];
  view: any[] = [300, 50];

  // options
  showXAxis: boolean = false;
  showYAxis: boolean = false;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = '';

  colorScheme = {
    domain: ['#A10A28', '#AAAAAA'],
  };

  constructor(public categoryUsageLimitService: CategoryUsageLimitService) {
  }

  ngOnInit(): void {
    Object.assign(this, {multi});
    this.categoryUsageLimitService.refresh();
  }

  onSelect(event) {
    console.log(event);
  }
}
