import { Component, OnInit } from '@angular/core';
import { CategoryUsageLimitService } from "../../../service/category-usage-limit.service";

@Component({
  selector: 'app-limit-chart',
  templateUrl: './limit-chart.component.html',
  styleUrls: ['./limit-chart.component.scss']
})
export class LimitChartComponent implements OnInit {


  // options
  view: any[] = [450, 35];
  showXAxis: boolean = false;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = false;
  yAxisLabel: string = '';
  trimYAxis: boolean = true;
  maxLength: number = 35;

  colorScheme = {
    domain: ['#A10A28', '#AAAAAA'],
  };

  constructor(public categoryUsageLimitService: CategoryUsageLimitService) {
  }

  ngOnInit(): void {
    this.categoryUsageLimitService.refresh();
  }

  onSelect(event) {
    console.log(event);
  }
}
