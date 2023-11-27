import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResults, getPaginationHeaders } from './paginationHelper';
import { UserParams } from '../_models/userParams';
import { Message } from '../_models/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../_models/user';
import { BehaviorSubject, take } from 'rxjs';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private http: HttpClient) { }

  createHubConnection(user: User, otherUsername: string){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: ()=> user.token
      }).withAutomaticReconnect().build();

    this.hubConnection.start().catch(error=> console.error(error));  
    this.hubConnection.on("ReceiveMessageThread", messages=>{
      this.messageThreadSource.next(messages);
    })
    this.hubConnection.on('UpdatedGroup', (group: Group)=>{
      if(group.connections.some(x=> x.username === otherUsername)){
        this.messageThread$.pipe(take(1)).subscribe({
          next: messages=> {
            messages.forEach(message =>{
              if(!message.dateRead){
                message.dateRead = new Date(Date.now())
              }
              this.messageThreadSource.next([...messages]);
            })
          }
        })
      }
    })

    this.hubConnection.on("NewMessage", message=>{
      this.messageThread$.pipe(take(1)).subscribe({
        next: messages=>{
          this.messageThreadSource.next([...messages, message])
        }
      })
    })
  }

  stopHubConnection(){
    if(this.hubConnection)
      this.hubConnection.stop().catch(error=> console.error(error));  
  }
  
  getMessages(userParams: UserParams, containner: string){
    let params = getPaginationHeaders(userParams);

    params = params.append('containner', containner);

    return getPaginatedResults<Message[]>(this.baseUrl+'messages',params,this.http)
  }

  getMessageThread(username:string){
    return this.http.get<Message[]>(this.baseUrl+'messages/thread/' + username);
  }

  async sendMessage(username:string, content:string){
    console.log(this.hubConnection)
    //return this.http.post<Message>(this.baseUrl+'messages',{recipientUsername: username, content:content})
    return  this.hubConnection?.invoke('SendMessage', {recipientUsername:username, content})
    .catch(error=> console.log(error));
  }

  deleteMessage(id: number){
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }


}
