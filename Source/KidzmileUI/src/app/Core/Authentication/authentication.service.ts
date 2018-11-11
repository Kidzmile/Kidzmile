import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(userName: string, password: string) {
        var data = "username=" + userName + "&password=" + password + "&grant_type=password";
        var requsetHeader = new HttpHeaders({
            'Content-Type': 'application/x-www-urlencoded',
            'No-Auth': 'True'
        });
        return this.http.post<any>(environment.api + '/token', data, { headers: requsetHeader })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUserToken', user.access_token);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUserToken');
    }
}