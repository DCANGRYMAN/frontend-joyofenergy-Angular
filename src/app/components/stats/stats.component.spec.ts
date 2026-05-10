import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BehaviorSubject } from "rxjs";
import { StatsComponent } from "./stats.component";
import { ApiService } from "src/app/shared/services/api.service";
import { take, filter } from "rxjs/operators";

describe("StatsComponent", () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let groupedSubject: BehaviorSubject<any>;

  const groupedMock = [
    { time: 1, value: 10 },
    { time: 2, value: 20 },
    { time: 3, value: 30 },
  ];

  beforeEach(async () => {
    groupedSubject = new BehaviorSubject(groupedMock);

    const apiServiceMock = {
      grouped: groupedSubject,
    };

    await TestBed.configureTestingModule({
      imports: [StatsComponent],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should calculate stats from grouped data", (done) => {
    component.stats$
      .pipe(
        filter((stats) => stats !== null),
        take(1)
      )
      .subscribe((stats) => {
        expect(stats).not.toBeNull();
        expect(stats!.totalConsumption).toBe(60);
        expect(stats!.estimatedCost).toBeCloseTo(51, 2);
        expect(stats!.footprint).toBeCloseTo(13.98, 2);
        done();
      });
  });

  it("should return null when grouped is null", (done) => {
    groupedSubject.next(null as any);

    component.stats$.pipe(take(1)).subscribe((stats) => {
      expect(stats).toBeNull();
      done();
    });
  });

  it("should recalculate when grouped data changes", (done) => {
    const newData = [{ time: 4, value: 100 }];
    groupedSubject.next(newData);

    component.stats$
      .pipe(
        filter((stats) => stats !== null),
        take(1)
      )
      .subscribe((stats) => {
        expect(stats!.totalConsumption).toBe(100);
        expect(stats!.estimatedCost).toBeCloseTo(85, 2);
        expect(stats!.footprint).toBeCloseTo(23.3, 2);
        done();
      });
  });
});

