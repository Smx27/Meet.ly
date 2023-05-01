import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

//this is use to send HTTPS requests 

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

  //Using Union type to fix the null user issue 
  private currentuserSource= new BehaviorSubject<User | null>(null);
  //Setting Up a Global Observable
  currentUser$= this.currentuserSource.asObservable();

  constructor(private http:HttpClient) { }

  //Settingup Local storage to persist user
  login(model:any)
  {
    return this.http.post<User>(this.baseUrl+'accounts/login',model).pipe(
      //UsingRxjs
      map((response:User)=>{
        const user= response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentuserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user:User){
    this.currentuserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentuserSource.next(null);
  }
}
