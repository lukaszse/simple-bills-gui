export class CategoryUsageLimitBarChart {

  name: string;
  spent: number;
  remainingLimit: number;
  totalLimit: number;
  series: Series[];

  constructor(name: string, spent: number, remainingLimit: number, totalLimit: number) {
    this.name = name;
    this.spent = spent;
    this.remainingLimit = remainingLimit;
    this.totalLimit = totalLimit;
    this.series = [new Series('already spent', spent), new Series('limit to be used', remainingLimit)];
  }
}

class Series {

  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}
