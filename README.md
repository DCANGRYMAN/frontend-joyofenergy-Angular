# Angular Frontend - Joy of Energy

Built with Angular 20.

---

## Quick Start

### Prerequisites
- Node.js and npm installed

### Installation
```bash
npm install
```

### Development Setup (Two Terminals)

**Terminal 1 - Mock Server:**
```bash
npm run server
```
Runs on `http://localhost:3000`

**Terminal 2 - Angular App:**
```bash
ng serve
```
Navigate to `http://localhost:4200` — app reloads automatically on file changes.

---

## Build & Deployment

### Production Build
```bash
ng build
```
Build artifacts will be stored in the `dist/` directory.

---

## Testing

### Unit Tests
```bash
ng test
```
Runs Karma with code coverage reporting.

### End-to-End Tests
```bash
ng e2e
```

---

## Architecture Overview

### Framework Upgrade
- Angular 14 → **Angular 20**
- Updated builders to Angular 20 standards
- Modernized configuration files (angular.json, tsconfig.json, tsconfig.spec.json)

### Standalone Components
- All components migrated to standalone pattern
- No NgModule dependencies
- HttpClient provided via `provideHttpClient()`
- **Components:**
  - AppComponent
  - MainComponent
  - ChartComponent
  - FooterComponent
  - SideBarComponent

### Reactivity with Signals
- `allReadings` — reactive signal for all data
- `activeFilter` — tracks current filter state (daily/weekly/monthly)
- `filteredData` — computed signal that auto-reacts to filter and data changes
- No manual change detection needed

### Service-Oriented Architecture
**ApiService owns:**
- Data fetching from backend
- Filter state management
- Chart rendering logic
- Grouped data emission
- Current device data

**MainComponent handles:**
- Presentation only
- User interactions (filter clicks)

### Dependency Injection with Tokens
All utility functions use `InjectionToken` for proper mocking in tests:
- `GROUP_BY_DAY` — groups readings by calendar day
- `GROUP_BY_HOUR` — groups readings by hour (for daily view)
- `SORT_BY_TIME` — sorts chronologically
- `RENDER_CHART` — renders Chart.js visualization

---

## Features

### Data Visualization
- **Daily:** Hourly breakdown (24 bars)
- **Weekly:** Daily breakdown (7 bars)
- **Monthly:** Daily breakdown (30 bars)

### Statistics
- Total consumption (kWh)
- Estimated cost ($)
- Carbon footprint (kg CO₂)

### Current Data
- Real-time power draw
- Solar production
- Grid feed-in amount
- Device usage breakdown

---

## Code Scaffolding

Generate new components:
```bash
ng generate component component-name
ng generate service|directive|pipe|guard|interface|enum
```

---

## Further Help

- [Angular CLI docs](https://angular.dev/cli)
- `ng help` command
- [Angular Official Docs](https://angular.dev)
