import {Component, OnInit} from '@angular/core';
import {Router, Routes} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {AuthGuard} from './auth/auth.guard';
import {SigninComponent} from './signin/signin.component';
import {AuthServiceLocalService} from './services/auth-service-local.service';
import {WindowRef} from './services/WindowRef';
import {MatDialog} from '@angular/material';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLogging = this.isLoggedIn$;
  routeLinks: any[];
  activeLinkIndex = -1;

  constructor(public router: Router, private  authGuard: AuthGuard, private authService: AuthServiceLocalService, private winRef: WindowRef,
              public dialog: MatDialog) {


    this.routeLinks = [
      {
        label: 'Home',
        link: './result-page',
        index: 0
      },
      {
        label: 'Location',
        link: './add-property',
        index: 1
      },
      {
        label: 'Basic Information',
        link: './location',
        index: 2
      }, {
        label: 'Layout & prizing',
        link: './layout-prizing',
        index: 3
      }, {
        label: 'Facilities & services',
        link: './facilities-and-services',
        index: 4
      }, {
        label: 'Add Photos',
        link: './add-photos',
        index: 5
      }, {
        label: 'Policies',
        link: './policies',
        index: 6
      },
      {
        label: 'Payments',
        link: './payments',
        index: 6
      }
    ];
  }

  // loadedFeature = 'recipe';
  //
  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }
  ngOnInit() {
    //this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    //this.isEdit$ = this.authService.getEdit;
   // this.router.navigate([{outlets: {sidebar: 'result-page'}}]);
   //  this.router.navigate([ 'home-page']);








  }
  signOut() {
    // remove user from local storage to log user out
    this.authService.removeToken();
    this.router.navigate(['home-page']);
    this.authGuard.signOut();

  }



  openDialog() {
    this.dialog.open(SigninComponent, {});
  }
  navigateResult(){
    this.router.navigate(['result-page']);
  }
  navigateAddProperty(){
    this.router.navigate([{outlets: {sidebar: 'add-property'}}]);
  }


}
