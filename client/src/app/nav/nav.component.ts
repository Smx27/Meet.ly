import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, VirtualTimeScheduler, of } from 'rxjs';
import { User } from '../_models/user';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  model:any={}

  constructor(public accountServices:AccountService, private router: Router,private toster:ToastrService) { }

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
      next: ()=>this.router.navigateByUrl('/members'),
      error: error=> this.toster.error(error.error)
    })
  }


  logout(){
    this.accountServices.logout();
  }

}
