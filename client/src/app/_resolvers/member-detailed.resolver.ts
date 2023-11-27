import { Injectable, inject } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';


@Injectable({
  providedIn: 'root'
})
export
 
class
 
MemberDetailedResolver
 
implements
 
Resolve<Member> {
  constructor(private membersService: MembersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Member> {
    return this.membersService.getMember(route.paramMap.get('username')!);
  }
}