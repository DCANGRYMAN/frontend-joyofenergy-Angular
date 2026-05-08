import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  grouped: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getReadings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/readings`);
  }

  setGroupedData(data: any) {
    this.grouped.next(data);
  }
}
