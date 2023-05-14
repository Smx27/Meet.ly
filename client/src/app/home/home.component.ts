import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUser()
  }

  registerToggle(){
    this.registerMode=!this.registerMode;
  }

   getUser(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response=> this.users=response,
      error: error=> console.error(error),
      complete: () => console.log('Request Completed')
      
    })
  }
}
