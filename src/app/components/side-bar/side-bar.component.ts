import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class SideBarComponent implements OnInit {
  energyConsumptionMap = new Map<string, string>([
    ["⚡️ 1.4kW", "Power draw"],
    ["☀️️ 5.8kW", "Solar power production"],
    ["🔌️ 4.4kW", "Fed into grid"],
  ]);
  devicesMap = new Map<string, string>([
    ["Air conditioner", "0.3093kW"],
    ["Wi-Fi router", "0.0033kW"],
    ["Humidifer", "0.0518kW"],
    ["Smart TV", "0.1276kW"],
    ["Diffuser", "0.0078kW"],
    ["Refrigerator", "0.0923kW"],
  ]);

  constructor() {}

  asIsOrder(a, b) {
    return 1;
  }
  ngOnInit(): void {}
}
