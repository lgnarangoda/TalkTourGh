import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs/Rx';
import {map, take} from 'rxjs/internal/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthServiceLocalService} from '../services/auth-service-local.service';



@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
   private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  // private edit = new BehaviorSubject<boolean>(false);
  //
  get isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn.next(true);

    }
    return this.loggedIn.asObservable(); // {2}
  }
  //
  // get getEdit() {
  //   return this.edit.asObservable();
  // }

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn.next(true);
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['home-page'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  signOut() {
    this.loggedIn.next(false);
    // this.edit.next(false);
  }

  //
  // editClick() {
  //   this.edit.next(true);
  // }
}
