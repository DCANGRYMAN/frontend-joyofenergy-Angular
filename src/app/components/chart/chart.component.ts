import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/shared/models/dataModel';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: true
})
export class ChartComponent {
  chart: any;
  @Input() chartData: Data[] = [];
}
