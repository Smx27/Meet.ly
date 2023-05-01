import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  model:any={}

  constructor(public accountServices:AccountService) { }

  ngOnInit(): void {
  }
  
  //Temporary to Persist user afterwards we use Async Pipe 
  //removing this cause we are using Observable now
  // getCurrentUser(){
  //   this.accountServices.currentUser$.subscribe({
  //     next: user=>this.loggedIn = !!user,
  //     error: error => console.log(error)
  //   })
  // }

  login()
  {
    this.accountServices.login(this.model).subscribe({
      next: response=>{
        console.log(response);
      },
      error: error=> console.log(error)
    })
  }


  logout(){
    this.accountServices.logout();
  }

}
