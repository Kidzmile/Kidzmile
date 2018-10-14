import { Injectable } from '@angular/core';
import { User } from '../../Model/User/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  userAuthentication(userName, password) {
    console.log(userName+"- "+password);
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' });
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded',
    'No-Auth':'True'});
    
    console.log(environment.api + '/token'+' - '+ data+ reqHeader );
    return this.http.post(environment.api + '/token', data, { headers: reqHeader });
  }
  
  registerUser(user: User) {
    const body: User = {
      userName: user.email,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber

    }

    return this.http.post(environment.api + '/api/Account/Register', body);
  }

  

}