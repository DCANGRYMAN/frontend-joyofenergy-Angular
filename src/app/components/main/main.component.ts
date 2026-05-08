import { Component, OnInit } from "@angular/core";
import { Data } from "src/app/shared/models/dataModel";
import { ApiService } from "src/app/shared/services/api.service";
import { renderChart } from "../../shared/utils/chart";
import {
  groupByDay,
  sortByTime,
  getReadings,
} from "../../shared/utils/reading";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  chartData: Data[] = [];

  constructor(private api: ApiService) {
    this.createChart();
  }


  async createChart() {
    const readings = await getReadings();
    const grouped = sortByTime(groupByDay(readings)).slice(-30);
    this.chartData = readings;
    renderChart("chart", grouped);
    this.api.grouped.next(grouped);
  }
}
