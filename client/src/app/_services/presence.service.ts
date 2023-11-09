import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUserSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUserSource.asObservable();
  constructor(private toster: ToastrService, private router: Router) { }

  createHubConnection(user: User){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

      this.hubConnection.start().catch(error => console.error(error));

      this.hubConnection.on('UserIsOnline', username =>{
        this.toster.info(username + ' Is online')
      })

      this.hubConnection.on('UserIsOffline', username =>{
        this.toster.warning(username + ' Is offline')
      })

      this.hubConnection.on('GetOnlineUsers', usernames => {
        this.onlineUserSource.next(usernames);
      })
      this.hubConnection.on('NewMessageReceived', ({username,knownAs}) => {
        this.toster.info(knownAs + ' Has sent you new message!')
          .onTap
          .pipe(take(1)).subscribe({
            next: () => this.router.navigateByUrl('/members/'+username+'?tab=4')
          })
      });
  }

  stopHubconnection(){
    this.hubConnection?.stop().catch(error=> console.error(error));
  }

}
