import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  model:any={}
  loggedIn = false;
  isCollapse = true;
  
  constructor(private accountServices:AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }
  
  //Temporary to Persist user afterwards we use Async Pipe
  getCurrentUser(){
    this.accountServices.currentUser$.subscribe({
      next: user=>this.loggedIn = !!user,
      error: error => console.log(error)
    })
  }

  login()
  {
    this.accountServices.login(this.model).subscribe({
      next: response=>{
        console.log(response);
        this.loggedIn = true;
      },
      error: error=> console.log(error)
    })
  }


  logout(){
    this.loggedIn=false;
    this.accountServices.logout();
  }

}
