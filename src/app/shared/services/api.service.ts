import { Injectable, inject, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Data } from "../models/dataModel";
import { GROUP_BY_DAY, GROUP_BY_HOUR, SORT_BY_TIME, RENDER_CHART } from "../utils/reading.tokens";

export type FilterType = "daily" | "weekly" | "monthly";

export interface CurrentData {
  current: {
    currentUsage: number;
    solarProduction: number;
    fedIntoGrid: number;
  };
  devices: { name: string; usage: number }[];
}

@Injectable({ providedIn: "root" })
export class ApiService {
  private http = inject(HttpClient);
  private groupByDay = inject(GROUP_BY_DAY);
  private groupByHour = inject(GROUP_BY_HOUR);
  private sortByTime = inject(SORT_BY_TIME);
  private renderChart = inject(RENDER_CHART);
  private apiUrl = "http://localhost:3000";

  allReadings = signal<Data[]>([]);
  activeFilter = signal<FilterType>("monthly");
  currentData = signal<CurrentData | null>(null); // ← novo
  grouped = new BehaviorSubject<any>(null);

  readonly filters: { label: string; value: FilterType }[] = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  filteredData = computed(() => {
    const filter = this.activeFilter();
    let grouped: Data[];
    
    if (filter === "daily") {
      grouped = this.sortByTime(this.groupByHour(this.allReadings()));
    } else {
      grouped = this.sortByTime(this.groupByDay(this.allReadings()));
    }
    
    const sliceMap: Record<FilterType, number> = {
      daily: 24,
      weekly: 7,
      monthly: 30,
    };
    return grouped.slice(-sliceMap[filter]);
  });

  loadReadings() {
    this.http.get<Data[]>(`${this.apiUrl}/readings`).subscribe((readings) => {
      this.allReadings.set(readings);
      this.updateChart();
    });
  }

  loadCurrentData() {
    this.http.get<CurrentData>(`${this.apiUrl}/data`).subscribe((data) => {
      this.currentData.set(data);
    });
  }

  setFilter(filter: FilterType) {
    this.activeFilter.set(filter);
    this.updateChart();
  }

  private updateChart() {
    const isHourly = this.activeFilter() === "daily";
    this.grouped.next(this.filteredData());
    this.renderChart("chart", this.filteredData(), isHourly);
  }
}