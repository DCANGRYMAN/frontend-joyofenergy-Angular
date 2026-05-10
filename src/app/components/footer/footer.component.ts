import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  totalConsumption = 0;
  estimatedCost = 0;
  footprint = 0;

  constructor(private api: ApiService) {
    this.api.grouped.subscribe((grouped) => {
      if (!grouped) return;

      this.totalConsumption = grouped.reduce(
        (sum, item) => sum + item.value,
        0
      );

      const pricePerKwh = 0.85;
      this.estimatedCost = this.totalConsumption * pricePerKwh;

      const kgCo2PerKwh = 0.233;
      this.footprint = this.totalConsumption * kgCo2PerKwh;
    });
  }
}