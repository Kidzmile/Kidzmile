import { Injectable, OnInit } from '@angular/core';
import { User } from '../../Model/User/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService  {

  constructor(private http: HttpClient,private userService: UserService) { }

  getAll() {
    return this.http.get<User[]>(environment.api+'/users');
}
get() {
  return this.http.get<User>(environment.api+'/user');
}
  userAuthentication(userName, password) {
    console.log(userName + "- " + password);
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' });
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-urlencoded',
      'No-Auth': 'True'
    });

    console.log(environment.api + '/token' + ' - ' + data + reqHeader);
    return this.http.post(environment.api + '/token', data, { headers: reqHeader });
  }

  registerUser(user: any) {
    const body: User = {
      userName: user.userName,
      password: user.cnfrmpwdGroup.newpassword,
      email: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber
    }
    console.log("callig api " + environment.api + '/api/Account/Register');
    return this.http.post(environment.api + '/api/Account/Register', body,
      { headers: new HttpHeaders({ 'No-Auth': 'True' }) });
  }

  getUserClaims() {
    console.log('calling claims');
    return this.http.get(environment.api + '/api/Account/GetUserClaims'
    // { headers: new HttpHeaders({ 'Authorization': 'Bearer' + localStorage.getItem('currentUserToken') }) }
     );
  }

  changePassword(currentpwd:string,newpassword:string){
    const body={
      "OldPassword":currentpwd,
      "NewPassword":newpassword,
      "ConfirmPassword":newpassword,
    }
    console.log(body);
   return this.http.post( environment.api + '/api/Account/ChangePassword',body);
  }

}
