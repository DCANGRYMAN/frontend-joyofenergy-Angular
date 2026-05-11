import { InjectionToken } from "@angular/core";
import { groupByDay, groupByHour, sortByTime } from "./reading";
import { renderChart } from "./chart";

export const GROUP_BY_DAY = new InjectionToken<typeof groupByDay>('groupByDay', {
  providedIn: 'root',
  factory: () => groupByDay,
});

export const GROUP_BY_HOUR = new InjectionToken<typeof groupByHour>('groupByHour', {
  providedIn: 'root',
  factory: () => groupByHour,
});

export const SORT_BY_TIME = new InjectionToken<typeof sortByTime>('sortByTime', {
  providedIn: 'root',
  factory: () => sortByTime,
});

export const RENDER_CHART = new InjectionToken<typeof renderChart>('renderChart', {
  providedIn: 'root',
  factory: () => renderChart,
});