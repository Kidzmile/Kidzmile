import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){ console.log('AuthGuard hit');}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem('userToken')!=null)
      {
        console.log(localStorage.getItem('userToken'));
    return true;
      }
    else{
      console.log('navigating to login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
