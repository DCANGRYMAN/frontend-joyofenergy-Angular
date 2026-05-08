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
  averageDailyConsumption = 0;

  constructor(private api: ApiService) {
    this.api.grouped.subscribe((grouped) => {
      if (!grouped) return;

      this.totalConsumption = grouped.reduce(
        (sum, item) => sum + item.value,
        0
      );

      const pricePerKwh = 0.85;
      this.estimatedCost = this.totalConsumption * pricePerKwh;
      this.averageDailyConsumption = this.totalConsumption / grouped.length;
    });
  }
}
