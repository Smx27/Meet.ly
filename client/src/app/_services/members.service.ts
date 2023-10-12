import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Observable, map, of } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members:Member[] = [];
  memberCache = new Map();

  baseUrl= environment.apiUrl;

  constructor(private http: HttpClient) { }

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

    let params = this.getPaginationHeaders(userParams);

    return this.getPaginatedResults<Member[]>(this.baseUrl + 'users',params).pipe(
      map(response =>{
        this.memberCache.set(key,response);
        return response;
      })
    )
  }

  private getPaginatedResults<T>(url: string,params: HttpParams) {
    const paginatedResults: PaginationResult<T> = new PaginationResult<T>;
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResults.result = response.body;
        }

        const pagination = response.headers.get('Pagination');

        if (pagination) {
          paginatedResults.pagination = JSON.parse(pagination);
        }

        return paginatedResults;
      })
    );
  }

  private getPaginationHeaders(userParams: UserParams) {
    let params = new HttpParams();

    params = params.append('pageNumber', userParams.pageNumber);
    params = params.append('pageSize', userParams.pageSize);
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return params;
  }

  /**
   * The function `getMember` retrieves a member's information from a server using an HTTP GET request.
   * @param {string} username - A string representing the username of the member you want to retrieve.
   * @returns an HTTP GET request to retrieve a member with the specified username. The response is
   * expected to be of type `Member`.
   */
  getMember(username: string){
    if(this.members.length>0) {
      const member = this.members.find(m=> m.userName===username);
      return of(member);
    }
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
