import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


/* The ErrorInterceptor class is an HTTP interceptor in TypeScript that handles and displays error
messages based on the HTTP response status code. */

@Injectable()
export default class ErrorInterceptor implements HttpInterceptor {

/**
 * This is a constructor function that takes in the Router and ToastrService as parameters.
 * @param {Router} router - The `router` parameter is an instance of the `Router` class from the
 * `@angular/router` module. It is used to navigate between different routes in the application. The
 * `Router` class provides methods to navigate to a specific route, navigate back to the previous
 * route, and navigate to a
 * @param {ToastrService} toster - The `toaster` parameter is an instance of the `ToastrService` class,
 * which is a service provided by the `ngx-toastr` library for displaying toast notifications in
 * Angular applications. The `ToastrService` provides methods for displaying success, error, warning,
 * and info messages in a
 */
  constructor(private router: Router, private toster: ToastrService) {}
/**
 * This function intercepts HTTP requests and handles errors based on their status codes.
 * @param request - An instance of the HttpRequest class, which represents an HTTP request that is
 * being intercepted.
 * @param {HttpHandler} next - The `next` parameter is an instance of the `HttpHandler` class, which
 * represents the next interceptor or the backend server that will handle the HTTP request. It is
 * responsible for forwarding the request to the next interceptor or the backend server and returning
 * the response back to the previous interceptor.
 * @returns The `intercept` method returns an Observable that is obtained by calling the `handle`
 * method of the `next` HttpHandler object, which represents the next interceptor in the chain or the
 * backend server if there are no more interceptors. The Observable is then piped through a
 * `catchError` operator that handles any errors that may occur during the HTTP request/response cycle.
 * The `catchError`
 */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any>  {
    return next.handle(request).pipe(
     /* The `catchError` operator is used to catch any errors that may occur during the HTTP
     request/response cycle. In this case, the function passed to `catchError` takes in an
     `HttpErrorResponse` object as a parameter and checks its `status` property to determine the
     type of error that occurred. */
      catchError((error :HttpErrorResponse): any  => 
      {
        if(error)
        {
          switch (error.status){
            case 400:
              /* This code block is checking if the `error` object returned by the HTTP request has an
              `errors` property in its `error` property. If it does, it means that the server has
              returned a validation error with a list of errors in the `errors` property. The code
              then loops through each error in the `errors` property and pushes them into an array
              called `modelStateErrors`. Finally, it throws the `modelStateErrors` array to be
              caught by the `catchError` operator and handled by the calling code. */
              if(error.error.errors)
              {
                const modelStateErrors=[];
                for(const key in error.error.errors){
                  if(error.error.errors[key])
                  {
                    modelStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modelStateErrors;
              }
              else{
                this.toster.error(error.error.errors,error.status.toString());
              }
              break;
            case 500:
              this.router.navigateByUrl('/server-error');
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 401:
              this.toster.error('Unauthorised',error.status.toString())
              break;
            default:
              this.toster.error('Something unexpedted happen');
              console.error(error.error);
              break;
          }
        }
        return error ;
      })
    )
  }
}
