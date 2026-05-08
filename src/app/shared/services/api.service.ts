import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  grouped: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

}

