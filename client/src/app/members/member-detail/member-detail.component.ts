import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  galleryOptions:NgxGalleryOptions[] =[];
  galleryImages: NgxGalleryImage[] = [];

  @ViewChild('tabSet', { static: false }) tabSet?: TabsetComponent;
  constructor(private memberService: MembersService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
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
  }
  //Load member from member service using the route 
  loadMember(){
    this.memberService.getMember(this.route.snapshot.paramMap.get('username') || '{}')
    .subscribe(member => {
      this.member = member;
      this.galleryImages = this.loadImages();
    })
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
