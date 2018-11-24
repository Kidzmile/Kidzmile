import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../Authentication/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).catch((err: HttpErrorResponse) => {
            if (err instanceof HttpErrorResponse) {
                console.log(err);
                /* if (err.status === 401) {
                     //this.authenticationService.logout();
                    // location.reload(true);
                     return Observable.throw(err.error);
                 }*/
                if (err.status === 400) {
                    return Observable.throw(err.error);
                }
                if (err.status === 404) {
                    return Observable.throw(err.error);
                }
                if (err.status === 403) {
                    return Observable.throw(err.error);
                }
                return Observable.throw(err.error);
            }
        });
    }
}