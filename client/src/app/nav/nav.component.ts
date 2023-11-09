import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, VirtualTimeScheduler, of } from 'rxjs';
import { User } from '../_models/user';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  model:any={}
/**
 * This is a constructor function that takes in three parameters: an account service, a router, and a
 * toastr service.
 * @param {AccountService} accountServices - An instance of the AccountService class that is used to
 * perform operations related to user accounts.
 * @param {Router} router - The router is a service provided by Angular that allows navigation between
 * different components and views in a single-page application. It is used to navigate to different
 * routes and URLs within the application.
 * @param {ToastrService} toster - The "toster" parameter is an instance of the ToastrService class,
 * which is a service provided by the Toastr library for displaying notifications and alerts in Angular
 * applications. It is used in this constructor to inject the ToastrService into the component so that
 * it can be used to display messages to the user.
 */

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

  /**
   * This function logs in a user and redirects them to the members page if successful, or displays an
   * error message if not.
   */
  login()
  {
    console.log(this.model)
    this.accountServices.login(this.model).subscribe({
      next: ()=>this.router.navigateByUrl('/members')
      //error: error=> this.toster.error(error.error)  this is handeled in interceptor
    })
  }


  /**
   * The function logs out the user by calling the logout method of the accountServices object.
   */
  logout(){
    this.accountServices.logout();
    this.router.navigateByUrl('/');
  }

}
