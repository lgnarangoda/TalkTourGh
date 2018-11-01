import {Component, OnInit} from '@angular/core';
import {Router, Routes} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {AuthGuard} from './auth/auth.guard';

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

  constructor(public router: Router, private  authService: AuthGuard) {


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


}
