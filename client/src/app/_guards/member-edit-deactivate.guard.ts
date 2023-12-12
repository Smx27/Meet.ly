import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class MemberEditDeactivateGuard implements CanDeactivate<MemberEditComponent> {
  private confirmService: ConfirmService;

  constructor(confirmService: ConfirmService) {
    this.confirmService = confirmService;
  }

  canDeactivate(
    component: MemberEditComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.editForm?.dirty) {
      return this.confirmService.confirm();
    }
    return true;
  }
}
