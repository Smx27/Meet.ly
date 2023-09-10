import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  //Grabbing from data in ts
  @ViewChild('editMember') editForm: NgForm | undefined;
  //Prevent user from changing paeg if there any changes
  @HostListener('window:beforeunload', ['$event']) unloadEvent($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | null = null;

  tinymceConfig: any = {};
  mceApiKey: string = environment.tinymceApikey;

  constructor(
    private accountService: AccountService,
    private membersService: MembersService,
    private toster: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => (this.user = user),
    });
    this.tinymceConfig = {
      height: 250,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount codesample',
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | codesample',
      paste_as_text: true,
      branding: false,
      statusbar: false,
      resize: false,
      menubar: false,
    };
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.membersService.getMember(this.user.username).subscribe({
      next: (member) => (this.member = member),
    });
  }

  updateMember() {
    this.membersService.updateMember(this.editForm?.value).subscribe({
      next: (_) => {
        this.toster.success('Member is updated successfully');
        this.editForm?.reset(this.member);
      },
    });
  }
}
