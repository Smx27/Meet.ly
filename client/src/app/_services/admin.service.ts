import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUserWithRole(){
    return this.http.get<User[]> (this.baseUrl + 'admin/users-with-roles')
  }

  updateUserRole(username:string, roles:string){
    console.log(this.baseUrl + 'admin/edit-roles/'+ username +'?roles=' + roles )
    return this.http.post<string[]>(this.baseUrl + 'admin/edit-roles/'+ username +'?roles=' + roles , {});
  }
}
