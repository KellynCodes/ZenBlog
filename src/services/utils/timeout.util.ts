import { Injectable } from "@angular/core";
import { timeout } from "rxjs";

@Injectable({providedIn: 'root'})
export class TimeOut {
  
  public setTimeOut(timeOut: number = 5): any {
    while (timeOut > 0) {
      timeOut--;
    }
    return null;
  }
}
