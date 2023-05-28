import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private service:AccountService,private toster:ToastrService){}
  canActivate(): Observable<boolean> {
    return this.service.currentUser$.pipe(
      map(user=>{
        if(user) return true;
        else{
          this.toster.error('You are not logged in!');
          return false;
        } 
      })
    )
  }
  
}
