import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
    console.log("passed through interceptor");
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // get the token from a service
   // console.log("Before sending data");
   /* if (req.headers.get('No-Auth') == "True") {
      console.log("passed through interceptor header No-Auth " + req.headers);
      return next.handle(req.clone());
    }*/
      if (localStorage.getItem('currentUserToken') != null) {
       console.log("passed through interceptor header currentUserToken");
       const clonedrequest = req.clone({
         headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('currentUserToken'))
       });
       return next.handle(clonedrequest);
      }

    return next.handle(req)
      .do((event: HttpEvent<any>) => {
        /*console.log("received response from interceptor event");
        if (event instanceof HttpResponse) {
          console.log("passed through interceptor event");
          console.log('Response is:');
          console.log(event.body)
        }
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            console.log("passed through interceptor error");
            console.log("error ");
            console.log(error.status);
            console.log(error.message);
          }
        }*/
      });
  }
}

