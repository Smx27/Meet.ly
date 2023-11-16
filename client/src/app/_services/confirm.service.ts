import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModalRef?: BsModalRef<ConfirmDialogComponent>;
  constructor(private modalService:BsModalService) {

  }

  confirm(
    title = 'Confirmation',
    message = 'Are You Sure?',
    btnOkText = 'Ok',
    btnCancleText = 'Cancle'
  ) : Observable<boolean>{
    const config = {
      initialState:{
        title,
        message,
        btnOkText,
        btnCancleText
      }
    }
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, config);

    return this.bsModalRef.onHidden!.pipe(map(()=>{
      return this.bsModalRef!.content!.result;
    }))
  }
}
