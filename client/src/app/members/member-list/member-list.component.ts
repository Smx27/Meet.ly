import { Component, OnInit } from '@angular/core';
import { Observable, every, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  //members:Member[]=[];
  members$:Observable<Member[]> | undefined;
  members: Member[] = [];

  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList =[{value: 'male', display: 'Males'},{value:'female', display:'Females'}];
  
  constructor(private  memberService: MembersService) { 
    this.userParams = memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
    // this.members$ = this.memberService.getMembers();
  }

  loadMembers(){
    if(this.userParams){
      this.memberService.setUserParams(this.userParams); 
      this.memberService.getMembers(this.userParams).subscribe({
        next: response => {
          if(response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      });
    }
  }

  resertFilter(){
 
    this.userParams = this.memberService.restUserParams();
    this.loadMembers(); 

  }

  pageChanged(e: any){
    if(this.userParams && this.userParams.pageNumber !== e.page){
      this.userParams.pageNumber = e.page;
      this.memberService.setUserParams(this.userParams)
      this.loadMembers();
    }
  }

  /**
   * The function "loadMembers" retrieves members from a service and assigns them to a variable.
   */
  //   loadMembers(){
  //     this.memberService.getMembers().subscribe({
  //       next: members => {
  //         this.members = members;
  //       }
  //     });
  //   }
 }
