import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  
  baseUrl= environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * The function `getMembers()` sends an HTTP GET request to retrieve a list of members from a
   * specified URL.
   * @returns The `getMembers()` function is returning an HTTP GET request to the `baseUrl` + 'users/'
   * endpoint, with the `getHttpOptions()` as the options for the request. The response from the
   * request is expected to be an array of `Member` objects.
   */
  getMembers(): Observable<Member[]>{
    console.log(this.baseUrl + 'users/');
    return this.http.get<Member[]>(this.baseUrl + 'users/');
  }

  /**
   * The function `getMember` retrieves a member's information from a server using an HTTP GET request.
   * @param {string} username - A string representing the username of the member you want to retrieve.
   * @returns an HTTP GET request to retrieve a member with the specified username. The response is
   * expected to be of type `Member`.
   */
  getMember(username: string){
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  //removed this function because jwt.interceptor.ts is now handling the token
  /**
   * The function retrieves the user's token from local storage and returns an HTTP options object with
   * the token included in the Authorization header.
   * @returns an object with a "headers" property. The value of the "headers" property is an instance
   * of the HttpHeaders class, which includes an "Authorization" header with a bearer token.
   */
  // getHttpOptions(){
  //   const userdata = localStorage.getItem('user');
  //   if(!userdata) return;
  //   const token = JSON.parse(userdata).token;
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + token
  //     })
  //   }
  // }
}
