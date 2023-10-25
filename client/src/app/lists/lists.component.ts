import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Member[] | undefined;
  predicates = 'liked';
  pageNumber=1;
  pageSize=5;
  pagination: Pagination | undefined;
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes()
  }

  loadLikes(){
    this.memberService.getLikes(this.predicates,this.pageNumber,this.pageSize).subscribe({
      next: response =>{
        this.members = response.result;
        this.pagination = response.pagination;
        console.log(response)
      }
    })
  }

  pageChanged(e: any){
    if(this.pageNumber !== e.page){
      this.pageNumber = e.page;
      this.loadLikes();
    }
  }

}
