import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResults, getPaginationHeaders } from './paginationHelper';
import { UserParams } from '../_models/userParams';
import { Message } from '../_models/message';
import { RouteReuseStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMessages(userParams: UserParams, containner: string){
    let params = getPaginationHeaders(userParams);

    params = params.append('containner', containner);

    return getPaginatedResults<Message[]>(this.baseUrl+'messages',params,this.http)
  }

  getMessageThread(username:string){
    return this.http.get<Message[]>(this.baseUrl+'messages/thread/' + username);
  }

  sendMessage(username:string, content:string){
    return this.http.post<Message>(this.baseUrl+'messages',{recipientUsername: username, content:content})
  }

  deleteMessage(id: number){
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
