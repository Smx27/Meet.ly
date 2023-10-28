import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member = {} as Member;
  galleryOptions:NgxGalleryOptions[] =[];
  galleryImages: NgxGalleryImage[] = [];
  messages: Message[] = [];

  @ViewChild('tabSet', { static: true }) tabSet?: TabsetComponent;
  activeTab?: TabDirective;

  constructor(private memberService: MembersService, private route:ActivatedRoute, private messageService:MessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })

    if(this.member)  this.galleryImages = this.loadImages();
    
    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        thumbnailsColumns: 4,
        previewAnimation: true,
        imagePercent:100,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ]

    this.route.queryParams.subscribe({
      next: params=>{
        params['tab'] && this.selectTab(params['tab'])
      }
    })
  }
  
  onTabActived(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages')
    {
      this.loadMessages();
    }
  }

  loadMessages(){
    if(this.member){
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => this.messages = messages
      })
    }
  }
 

  selectTab(tabId: number) {
    if (this.tabSet?.tabs[tabId]) {
      this.tabSet.tabs[tabId].active = true;
    }
    
  }

  loadImages(){
    if(!this.member) return [];
    const Images: NgxGalleryImage [] =[];
    this.member.photos.forEach(photo => {
      Images.push({
        small:photo.url,
        medium:photo.url,
        big:photo.url
      });
    });
    return Images;
  }

}
