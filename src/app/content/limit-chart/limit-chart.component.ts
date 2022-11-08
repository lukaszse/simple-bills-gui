import { Component, OnInit } from '@angular/core';
import { Observable, tap } from "rxjs";
import { multi } from "./data";
import { CategoryUsageLimitService } from "../../../service/category-usage-limit.service";
import { CategoryUsageLimit } from "../../../dto/categoryUsageLimit";
import { CategoryUsageLimitBarChart } from "./categoryUsageLimitBarChart";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-limit-chart',
  templateUrl: './limit-chart.component.html',
  styleUrls: ['./limit-chart.component.scss']
})
export class LimitChartComponent implements OnInit {

  public categoryUsageBarCharts$: Observable<CategoryUsageLimitBarChart[][]>;

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

  constructor(private categoryUsageLimitService: CategoryUsageLimitService) {
    this.categoryUsageBarCharts$ = categoryUsageLimitService.categoryUsageLimit$
      .pipe(
        map(LimitChartComponent.prepareBarCharData),
        tap(() => console.log('Category usage limits after conversion to bar charts')),
        tap(console.log)
      );
  }

  ngOnInit(): void {
    Object.assign(this, {multi});
    this.categoryUsageLimitService.refresh();
    this.categoryUsageBarCharts$ = this.categoryUsageLimitService.categoryUsageLimit$
      .pipe(
        map(LimitChartComponent.prepareBarCharData),
        tap(() => console.log('Category usage limits after conversion to bar charts')),
        tap(console.log)
      );
  }

  onSelect(event) {
    console.log(event);
  }

  static prepareBarCharData(categoryUsageLimits: CategoryUsageLimit[]): CategoryUsageLimitBarChart[][] {
    return categoryUsageLimits
      .map(LimitChartComponent.convertToBarChartData);
  }

  static convertToBarChartData(categoryUsageLimit: CategoryUsageLimit): CategoryUsageLimitBarChart[] {
    return [new CategoryUsageLimitBarChart(categoryUsageLimit.categoryName, categoryUsageLimit.usage, categoryUsageLimit.limit)];
  }
}
