/*
  we are using this intercepter because now we have token and we whenever we want to make any
  request we nned to send this token thriugh header for verification.
*/
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log("token-interceptor.interceptor Called");

    const token=localStorage.getItem('token'); //getting token from local storage.

    if(token){
      request=request.clone({
        setHeaders:{Authorization:`Bearer ${token}`} //api me header set ho rha hai
      });
    }

    return next.handle(request).pipe( //this is for error if server is not working
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          console.log(err.url);
          alert("Please Start Your Backend")
          localStorage.clear();
          if(err.status===401|| err.status===403){
              if(this.router.url===''){}
              else{
                localStorage.clear();
                this.router.navigate(['']);
              }
          }
        }
        return throwError(err);
      })
    )
  }
}
