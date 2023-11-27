/* The AccountService class is an Angular service that handles user authentication and registration
through HTTPS requests and uses local storage to persist user data. */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';
import { registerUser } from '../_models/registerUser';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';

//this is use to send HTTPS requests

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  //Using Union type to fix the null user issue
  /* The line `private currentuserSource= new BehaviorSubject<User | null>(null);` is defining a private
property called `currentuserSource` in the `AccountService` class. It is using a Union type to fix
the null user issue, which means that the property can hold either a `User` object or a `null`
value. The `BehaviorSubject` class is used to create an observable that can emit values and also has
a `next()` method to update its current value. By initializing it with a `null` value, it ensures
that the `currentUser$` observable will emit a `null` value by default until a user object is set.
This helps to avoid errors that can occur when trying to access properties of a null object. */
  private currentuserSource = new BehaviorSubject<User | null>(null);

  //Setting Up a Global Observable
  /* `currentUser$= this.currentuserSource.asObservable();` is creating a global observable called
 `currentUser$` that emits the current user object whenever it changes. It is initialized with the
 `currentuserSource` BehaviorSubject, which is a type of observable that can emit values and also
 has a `next()` method to update its current value. By using `asObservable()`, the `currentUser$`
 observable is made read-only to the outside world, so that only the `AccountService` class can
 update its value using the `setCurrentUser()` method. This allows other components or services in
 the application to subscribe to `currentUser$` and receive updates whenever the user object
 changes. */
  currentUser$ = this.currentuserSource.asObservable();
  /**
   * This is a constructor function that takes in an instance of the HttpClient class as a parameter and
   * assigns it to a private property.
   * @param {HttpClient} http - The "http" parameter is an instance of the HttpClient class, which is
   * used to make HTTP requests to a server. It is typically injected into a component or service using
   * Angular's dependency injection system.
   */

  constructor(private http: HttpClient, private presenceService: PresenceService) { }

  /* This code is defining a method called `login` in the `AccountService` class. This method takes in a
`model` parameter and sends a HTTPS POST request to the server to authenticate the user. If the
authentication is successful, the user object is returned in the response. The `map` operator from
RxJS is used to transform the response into a `User` object. If the user object is not null, it is
stored in the local storage using `localStorage.setItem` and emitted to the `currentUser$`
observable using `this.currentuserSource.next(user)`. Finally, the user object is returned. This
allows the user to stay logged in even if they refresh the page or close the browser. */
  //Settingup Local storage to persist user
  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'accounts/login', model).pipe(
      //UsingRxjs
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  /* The `register` method in the `AccountService` class is used to register a new user by sending a
  HTTPS POST request to the server with the user's registration details. The `model` parameter
  contains the user's registration details such as email, password, and username. */
  //Register a User
  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'accounts/register', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  /**
   * The function sets the current user using a BehaviorSubject in TypeScript.
   * @param {User} user - User is a data type or class that represents a user object. It could contain
   * properties such as username, email, password, and other relevant information about the user. The
   * setCurrentUser function takes an instance of the User class as a parameter and sets it as the
   * current user using the currentuserSource.next
   */
  setCurrentUser(user: User) {
    user.roles  = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentuserSource.next(user);

    this.presenceService.createHubConnection(user);
  }

  /**
   * The function removes the user from local storage and sets the current user to null.
   */
  logout() {
    localStorage.removeItem('user');
    this.currentuserSource.next(null);
    this.presenceService.stopHubconnection();
  }


  UserListsUrl="userlisturl";
  list(): Observable<any> {
    return this.http.get(this.UserListsUrl);
  }

  getDecodedToken(token:string){
    return JSON.parse(atob(token.split('.')[1]));
  }
}
