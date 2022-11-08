export class CategoryUsageLimitBarChart {

  name: string;
  series: Series[];

  constructor(name: string, spent: number, limit: number) {
    const spentSeries = new Series('already spent', spent);
    const limitSeries = new Series('limit to be used', limit);
    const series: Series[] = [spentSeries, limitSeries];
    this.name = name;
    this.series = series;
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
