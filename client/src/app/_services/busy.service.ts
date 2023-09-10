import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyrequestCount = 0;
  constructor(private spinnerServices: NgxSpinnerService) {}
  busy() {
    this.busyrequestCount++;
    this.spinnerServices.show(undefined, {
      type: 'ball-atom',
      bdColor:'rgba(255,255,255,0)',
      color:'#333333'
    });
  }
  idle() {
    this.busyrequestCount--;
    if (this.busyrequestCount <= 0) {
      this.busyrequestCount = 0;
      this.spinnerServices.hide();
    }
  }
}
