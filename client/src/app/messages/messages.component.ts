import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { UserParams } from '../_models/userParams';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages?: Message[];

  pagination?: Pagination;
  containner = 'Unread';
  userParams?: UserParams;
  loading = false;

  constructor(private messageServices:MessageService, private accountService: AccountService) { 
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          this.userParams = new UserParams(user);
        }
      }
    })
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  deleteMessage(id: number){
    this.messageServices.deleteMessage(id).subscribe({
      next: () => this.messages?.splice(this.messages.findIndex(m=> m.id === id), 1)
    })
  }
  
  loadMessages(){
    this.loading = true;
    if(this.userParams)
    {
      this.messageServices.getMessages(this.userParams,this.containner).subscribe({
        next: response =>{
          this.messages = response.result;
          this.pagination = response.pagination;
          this.loading = false;
        }
      })
    }
  }

  pageChanged(event: any){
    if(this.userParams && this.userParams.pageNumber !== event.page){
      this.userParams.pageNumber = event.page;
      this.loadMessages();
    }
  }
}
