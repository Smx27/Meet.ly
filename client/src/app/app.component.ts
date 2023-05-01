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
  users: any;

  constructor(private http: HttpClient,private accountService:AccountService){

  }
  
  ngOnInit(): void {
    this.getUser();
    this.setCurrentUser();
  }
  
  getUser(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response=> this.users=response,
      error: error=> console.error(error),
      complete: () => console.log('Request Completed')
      
    })
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user:User=JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
