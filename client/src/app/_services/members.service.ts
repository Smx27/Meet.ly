import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Observable, map, of, take } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResults, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members:Member[] = [];
  memberCache = new Map();
  userParams: UserParams | undefined;
  user: User | undefined;
  baseUrl= environment.apiUrl;

  constructor(private http: HttpClient, private accountService: AccountService) { 
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params:UserParams){
    this.userParams = params;
  }

  restUserParams(){
    if(this.user){
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }

  /**
   * The function `getMembers()` sends an HTTP GET request to retrieve a list of members from a
   * specified URL.
   * @returns The `getMembers()` function is returning an HTTP GET request to the `baseUrl` + 'users/'
   * endpoint, with the `getHttpOptions()` as the options for the request. The response from the
   * request is expected to be an array of `Member` objects.
   */
  getMembers(userParams: UserParams){
    const key = Object.values(userParams).join('-');

    const response = this.memberCache.get(key);
    
    if (response) return of(response);

    let params = getPaginationHeaders(userParams);

    return getPaginatedResults<Member[]>(this.baseUrl + 'users',params, this.http).pipe(
      map(response =>{
        this.memberCache.set(key,response);
        return response;
      })
    )
  }

  addLike(username:string){
    return this.http.post(this.baseUrl+'likes/'+username,{});
  }

  getLikes(predicates:string, pageNumber:number, pageSize:number){
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    params = params.append('predicates' ,predicates);
    return getPaginatedResults<Member[]>(this.baseUrl + 'likes', params,this.http);
  }
  
  
  /**
   * The function `getMember` retrieves a member's information from a server using an HTTP GET request.
   * @param {string} username - A string representing the username of the member you want to retrieve.
   * @returns an HTTP GET request to retrieve a member with the specified username. The response is
   * expected to be of type `Member`.
   */
  getMember(username: string){
    
    /* This code is retrieving a member from the `memberCache` map based on their username. */
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result),[])
      .find((member: Member) => member.userName == username)
    
      if(member) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member:Member)
  {
    return this.http.put<Member>(this.baseUrl+'users',member).pipe(
      map(() =>{
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members,...member};
      })
    )
  }
  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId,{});
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/add-main-photo/' + photoId,{});
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
