import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BehaviorSubject } from "rxjs";
import { FooterComponent } from "./footer.component";
import { ApiService } from "src/app/shared/services/api.service";

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  const groupedMock = [
    { time: 1, value: 10 },
    { time: 2, value: 20 },
    { time: 3, value: 30 },
  ];

  const apiServiceMock = {
    grouped: new BehaviorSubject(groupedMock),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should calculate total consumption", () => {
    expect(component.totalConsumption).toBe(60);
  });

  it("should calculate estimated cost", () => {
    expect(component.estimatedCost).toBe(51);
  });

  it("should calculate daily average consumption", () => {
    expect(component.averageDailyConsumption).toBe(20);
  });
});