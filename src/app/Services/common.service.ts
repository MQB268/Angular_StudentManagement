import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public age = 10;
  public totalStudents = 0;
  public totalStudents$ = new BehaviorSubject<number>(0);

  constructor() { }

   public setTotalStudents (total: number) {
    this.totalStudents = total;
    this.totalStudents$.next(total);
    // console.log('total = ' + total);
  }

  public increamentStudent () {
    this.totalStudents++;
    this.totalStudents$.next(this.totalStudents);
  }
}
