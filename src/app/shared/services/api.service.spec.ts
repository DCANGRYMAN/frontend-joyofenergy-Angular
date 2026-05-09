import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { ApiService, FilterType } from "./api.service";
import { Data } from "../models/dataModel";

describe("ApiService", () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  const mockReadings: Data[] = [
    {
      time: new Date("2024-01-01T00:00:00Z").getTime(),
      value: 10,
    },
    {
      time: new Date("2024-01-02T00:00:00Z").getTime(),
      value: 20,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should initialize allReadings as empty array", () => {
    expect(service.allReadings()).toEqual([]);
  });

  it("should initialize activeFilter as monthly", () => {
    expect(service.activeFilter()).toBe("monthly");
  });

  it("should initialize grouped BehaviorSubject with null", () => {
    expect(service.grouped.getValue()).toBeNull();
  });

  it("should have 3 filters", () => {
    expect(service.filters.length).toBe(3);
  });

  it("should have correct labels and values", () => {
    expect(service.filters[0]).toEqual({
      label: "Daily",
      value: "daily",
    });

    expect(service.filters[1]).toEqual({
      label: "Weekly",
      value: "weekly",
    });

    expect(service.filters[2]).toEqual({
      label: "Monthly",
      value: "monthly",
    });
  });

  it("should load readings from API and set allReadings", () => {
    service.loadReadings();

    const req = httpMock.expectOne(
      "http://localhost:3000/readings"
    );

    expect(req.request.method).toBe("GET");

    req.flush(mockReadings);

    expect(service.allReadings()).toEqual(mockReadings);
  });

  it("should update activeFilter signal", () => {
    service.setFilter("weekly");

    expect(service.activeFilter()).toBe("weekly");
  });

  it("should set all filter types correctly", () => {
    const filterTypes: FilterType[] = [
      "daily",
      "weekly",
      "monthly",
    ];

    filterTypes.forEach((filter) => {
      service.setFilter(filter);

      expect(service.activeFilter()).toBe(filter);
    });
  });

  it("should emit values to grouped subject", () => {
    const emittedValues: any[] = [];

    service.grouped.subscribe((value) => {
      emittedValues.push(value);
    });

    service.setFilter("weekly");

    expect(emittedValues.length).toBeGreaterThan(0);
  });
});