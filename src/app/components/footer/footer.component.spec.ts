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

  it("should calculate stats from grouped data", (done) => {
    component.stats$.subscribe((stats) => {
      expect(stats).not.toBeNull();
      expect(stats!.totalConsumption).toBe(60);
      expect(stats!.estimatedCost).toBeCloseTo(51, 2);
      expect(stats!.footprint).toBeCloseTo(13.98, 2);
      done();
    });
  });

  it("should return null when grouped is null", (done) => {
    apiServiceMock.grouped.next(null as any);

    component.stats$.subscribe((stats) => {
      expect(stats).toBeNull();
      done();
    });
  });

  it("should recalculate when grouped data changes", (done) => {
    const newData = [{ time: 4, value: 100 }];
    apiServiceMock.grouped.next(newData);

    component.stats$.subscribe((stats) => {
      expect(stats!.totalConsumption).toBe(100);
      expect(stats!.estimatedCost).toBeCloseTo(85, 2);
      expect(stats!.footprint).toBeCloseTo(23.3, 2);
      done();
    });
  });
});