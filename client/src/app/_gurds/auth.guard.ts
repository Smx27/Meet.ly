import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

/* The AuthGuard class checks if the user is logged in and returns an observable boolean value. */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private service:AccountService,private toster:ToastrService){}
  /**
   * The function checks if the user is logged in and returns an observable boolean value.
   * @returns The `canActivate()` method is returning an Observable of boolean values. The Observable
   * is created by piping the `currentUser$` Observable from the `service` and mapping its emitted
   * values to either `true` or `false` based on whether a user is present or not. If a user is not
   * present, an error message is displayed using a `toster` and `false` is returned.
   */
  canActivate(): Observable<boolean> {
    return this.service.currentUser$.pipe(
      /* The `map()` function is used to transform the emitted values of an Observable. In this case,
      it is used to transform the emitted value of the `currentUser$` Observable from the
      `AccountService`. */
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
