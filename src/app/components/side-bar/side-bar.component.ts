import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, computed } from "@angular/core";
import { ApiService } from "../../shared/services/api.service";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class SideBarComponent implements OnInit {
  private apiService = inject(ApiService);

  current = computed(() => this.apiService.currentData()?.current);
  devices = computed(() => this.apiService.currentData()?.devices ?? []);

  ngOnInit(): void {
    this.apiService.loadCurrentData();
  }
}