import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toster: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any>  {
    return next.handle(request).pipe(
      catchError((error :HttpErrorResponse): any  => 
      {
        if(error)
        {
          switch (error.status){
            case 400:
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
              const navigationExtras: NavigationExtras = {state:{error: error.error}};
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
