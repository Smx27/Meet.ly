import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Meet.ly';

  /* The `constructor` is a method that is called when an instance of the `AppComponent` class is
  created. In this case, it is taking an instance of the `AccountService` class as a parameter and
  assigning it to a private property called `accountService`. This allows the `AppComponent` class
  to use the methods and properties of the `AccountService` class within its own methods. */
  constructor(private accountService:AccountService){

  }
  
  ngOnInit(): void {
    this.setCurrentUser();
  }
  

  /**
   * This function retrieves the current user from local storage and sets it as the current user in the
   * account service.
   * @returns If the `userString` is not found in the `localStorage`, then `undefined` is being
   * returned. Otherwise, nothing is being returned explicitly as the function is just setting the
   * current user using the `accountService.setCurrentUser` method.
   */
  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user:User=JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
