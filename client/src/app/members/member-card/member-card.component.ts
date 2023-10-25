import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined; // member is an input property, so it can be passed in from the member-list component
  
  constructor(private memberService:MembersService, private toster:ToastrService) { }

  ngOnInit(): void {
  }

  addLike(member:Member){
    this.memberService.addLike(member.userName).subscribe({
      next: () => this.toster.success('You have liked '+ member.knownAs)
    });
  }

}
