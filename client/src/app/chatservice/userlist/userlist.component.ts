import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { userList } from 'src/app/_models/userList';
import { UserParams } from 'src/app/_models/userParams';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: [
    './userlist.component.css',
    '../chatservice.component.scss'
  ]
})
export class UserlistComponent implements OnInit {
  members$:Observable<Member[]> | undefined;
  members: Member[] = [];
  userlist: userList[] = [];

  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  constructor(private memberService: MembersService) { 
    this.userParams = memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
    this.getUserlist();
  }

  loadMembers(){
    if(this.userParams){
      this.memberService.setUserParams(this.userParams); 
      this.memberService.getMembers(this.userParams).subscribe({
        next: response => {
          if(response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
            console.log(this.members)
          }
        }
      });
    }
  }
  getUserlist()
  {
    if(this.userParams){
      this.memberService.setUserParams(this.userParams); 
      this.memberService.getUserlist(this.userParams).subscribe({
        next: response => {
          if(response.result && response.pagination) {
            this.userlist = response.result;
            this.pagination = response.pagination;
            console.log(this.userlist)
          }
        }
      });
    }
  }
}
