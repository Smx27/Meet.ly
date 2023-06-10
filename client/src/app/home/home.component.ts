import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

/* The `@Component` decorator is used to define a new component in Angular. It takes an object as an
argument with properties that define the component's behavior and appearance. */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;
  constructor(private http: HttpClient) { }

  /**
   * The ngOnInit function calls the getUser function.
   */
  ngOnInit(): void {
    this.getUser()
  }

  /**
   * The function toggles the register mode.
   */
  registerToggle(){
    this.registerMode=!this.registerMode;
  }

   /**
    * The function sends an HTTP GET request to retrieve a list of users from a specified API endpoint
    * and assigns the response to a local variable.
    */
   getUser(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response=> this.users=response,
      error: error=> console.error(error),
      complete: () => console.log('Request Completed')
      
    })
  }

  /**
   * The function CancleRegisterMode sets the registerMode property to the value of the event
   * parameter.
   * @param {boolean} event - The "event" parameter is a boolean value that is passed as an argument to
   * the "CancleRegisterMode" function. It is used to determine whether the register mode should be
   * cancelled or not. If the value of "event" is true, then the register mode will be cancelled,
   * otherwise
   */
  CancleRegisterMode(event: boolean){
    this.registerMode=event;
  }
}
