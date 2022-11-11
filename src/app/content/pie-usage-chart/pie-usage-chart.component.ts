import { Component, OnInit } from '@angular/core';
import { UsageLimitPieChartService } from "../../../service/usage-limit-pie-chart.service";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'app-pie-usage-chart',
  templateUrl: './pie-usage-chart.component.html',
  styleUrls: ['./pie-usage-chart.component.scss']
})
export class PieUsageChartComponent implements OnInit {

  view: any[] = [550, 200];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: [
      '#3F3B6C',
      '#624F82',
      '#9F73AB',
      '#A3C7D6',
      '#a5d6a3',
      '#646e3e'],
  };

  constructor(public pieChartService: UsageLimitPieChartService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.pieChartService.refresh();
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  toCurrency(data): string {
    return this.currencyPipe.transform(data, 'USD', 'symbol', '1.2-2');
  }
}
