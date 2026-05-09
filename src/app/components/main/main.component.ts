import { Component, inject } from "@angular/core";
import { ApiService } from "src/app/shared/services/api.service";
import { FooterComponent } from "../footer/footer.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { ChartComponent } from "../chart/chart.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  standalone: true,
  imports: [ChartComponent, SideBarComponent, FooterComponent, CommonModule],
})
export class MainComponent {
  api = inject(ApiService);

  constructor() {
    this.api.loadReadings();
  }

  setFilter(filter: "daily" | "weekly" | "monthly") {
    this.api.setFilter(filter);
  }
}