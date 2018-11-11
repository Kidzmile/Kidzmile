import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { console.log('AuthGuard hit'); }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('currentUserToken') != null) {
      // logged in so return true
      return true;
    }
     // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'] ,{ queryParams: { returnUrl: state.url }});
      return false;
    
  }
}
