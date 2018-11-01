import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../auth/auth.guard';
import {Router} from '@angular/router';

import {SigninComponent} from '../../signin/signin.component';
import {WindowRef} from '../../services/WindowRef';
import {MatDialog} from '@angular/material';
import {Observable} from '../../../../node_modules/rxjs/Rx';
import {AuthServiceLocalService} from '../../services/auth-service-local.service';

@Component({
  selector: 'app-seconde-header',
  templateUrl: './seconde-header.component.html',
  styleUrls: ['./seconde-header.component.css']
})
export class SecondeHeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  nativeWindow: any;

  name = localStorage.getItem('name');

  constructor(private  authGuard: AuthGuard, private authService: AuthServiceLocalService, private winRef: WindowRef,
              public dialog: MatDialog, private router: Router) {
    this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authGuard.isLoggedIn; // {2}
  }

  signOut() {
    // remove user from local storage to log user out
    this.authService.removeToken();
    this.router.navigate(['home-page']);
    this.authGuard.signOut();

  }
  navigateToHomepage() {
    this.router.navigate(['home-page']);
  }



  openDialog() {
    this.dialog.open(SigninComponent, {});
  }
  navigateResult(){
    this.router.navigate(['result-page']);
  }
  navigateAddProperty(){
    localStorage.removeItem('propertyId')
    this.router.navigate([{outlets: {sidebar: 'add-property'}}]);
  }

}

