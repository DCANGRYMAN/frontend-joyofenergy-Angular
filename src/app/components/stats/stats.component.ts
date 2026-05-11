import { CommonModule, AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.scss"],
  standalone: true,
  imports: [CommonModule, AsyncPipe],
})
export class StatsComponent {
  private readonly PRICE_PER_KWH = 0.85;
  private readonly KG_CO2_PER_KWH = 0.233;

  private readonly api = inject(ApiService);

  readonly stats$ = this.api.grouped.pipe(
    map((grouped) => {
      if (!grouped) return null;

      const totalConsumption = grouped.reduce((sum, item) => sum + item.value, 0);

      return {
        totalConsumption,
        estimatedCost: totalConsumption * this.PRICE_PER_KWH,
        footprint: totalConsumption * this.KG_CO2_PER_KWH,
      };
    })
  );
}