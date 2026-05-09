import { Injectable, inject, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Data } from "../models/dataModel";
import { GROUP_BY_DAY, SORT_BY_TIME, RENDER_CHART } from "../utils/reading.tokens";

export type FilterType = "daily" | "weekly" | "monthly";

@Injectable({ providedIn: "root" })
export class ApiService {
  private http = inject(HttpClient);
  private groupByDay = inject(GROUP_BY_DAY);
  private sortByTime = inject(SORT_BY_TIME);
  private renderChart = inject(RENDER_CHART);
  private apiUrl = "http://localhost:3000";

  allReadings = signal<Data[]>([]);
  activeFilter = signal<FilterType>("monthly");
  grouped = new BehaviorSubject<any>(null);

  readonly filters: { label: string; value: FilterType }[] = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  filteredData = computed(() => {
    const grouped = this.sortByTime(this.groupByDay(this.allReadings()));
    const sliceMap: Record<FilterType, number> = {
      daily: 1,
      weekly: 7,
      monthly: 30,
    };
    return grouped.slice(-sliceMap[this.activeFilter()]);
  });

  loadReadings() {
    this.http.get<Data[]>(`${this.apiUrl}/readings`).subscribe((readings) => {
      this.allReadings.set(readings);
      this.updateChart();
    });
  }

  setFilter(filter: FilterType) {
    this.activeFilter.set(filter);
    this.updateChart();
  }

  private updateChart() {
    this.grouped.next(this.filteredData());
    this.renderChart("chart", this.filteredData());
  }
}