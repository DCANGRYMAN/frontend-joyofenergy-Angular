import { Component, signal, computed } from "@angular/core";
import { Data } from "src/app/shared/models/dataModel";
import { ApiService } from "src/app/shared/services/api.service";
import { renderChart } from "../../shared/utils/chart";
import {
  groupByDay,
  sortByTime,
  getReadings,
} from "../../shared/utils/reading";
import { FooterComponent } from "../footer/footer.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { ChartComponent } from "../chart/chart.component";
import { CommonModule } from "@angular/common";
import { ThemeService } from "src/app/shared/services/theme.service";

type FilterType = "daily" | "weekly" | "monthly" | "annual";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  standalone: true,
  imports: [ChartComponent, SideBarComponent, FooterComponent, CommonModule],
})
export class MainComponent {
  allReadings = signal<Data[]>([]);
  activeFilter = signal<FilterType>("monthly");
  filteredData = computed(() => {
    const readings = this.allReadings();
    const filter = this.activeFilter();
    const grouped = sortByTime(groupByDay(readings));

    const sliceMap: Record<FilterType, number> = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      annual: 365,
    };

    return grouped.slice(-sliceMap[filter]);
  });

  readonly filters: { label: string; value: FilterType }[] = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Annual", value: "annual" },
  ];

  constructor(
    private api: ApiService,
    public theme: ThemeService,
  ) {
    this.loadData();
  }

  async loadData() {
    const readings = await getReadings();
    this.allReadings.set(readings);
    this.api.grouped.next(this.filteredData());
    renderChart("chart", this.filteredData());
  }

  setFilter(filter: FilterType) {
    this.activeFilter.set(filter);
    this.api.grouped.next(this.filteredData());
    renderChart("chart", this.filteredData());
  }
}
