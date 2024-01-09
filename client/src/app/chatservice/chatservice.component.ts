import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chatservice',
  templateUrl: './chatservice.component.html',
  styleUrls: ['./chatservice.component.scss']
})
export class ChatserviceComponent implements OnInit {
  //@Input() messages: Message[] = [];
  @Input() username?: string;
  messageContent = '';
  @ViewChild('messageForm') messageForm?: NgForm;
  constructor(public messageService:MessageService) { }

  ngOnInit(): void {

  }

  sendMessage(){
    if(!this.username) return;

    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm?.reset();
    })
  }


}
