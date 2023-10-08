import { Component, OnInit } from '@angular/core';
import { Observable, every } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
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
  pageNumber: number = 1;
  pageSize: number = 5;
  constructor(private  memberService: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
    // this.members$ = this.memberService.getMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if(response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  pageChanged(e: any){
    if(this.pageNumber != e.page){
      this.pageNumber = e.page;
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
