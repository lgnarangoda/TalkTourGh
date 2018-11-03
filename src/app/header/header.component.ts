import {AuthGuard} from '../auth/auth.guard';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {WindowRef} from '../services/WindowRef';
import {cleanSession} from 'selenium-webdriver/safari';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {SigninComponent} from '../signin/signin.component';
import {AuthServiceLocalService} from '../services/auth-service-local.service';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
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
    this.mobileNavigation();
  }

  listPropert(type: string) {
    const newWindow = this.nativeWindow.open('/app-app-component2');
    //   this.Service.assignActivity(type).subscribe(res => {
    //
    //     newWindow.location = '/#/link/' + res;
    //     console.log(res);
    //
    // }
  }


  signIn() {
    this.dialog.open(SigninComponent, {});
    // this.mobileNavigation();
    // console.log("dsddwewe")
  }

  navigateResult() {
    this.router.navigate(['result-page']);
  }

  navigateAddProperty() {
    this.router.navigate([{outlets: {sidebar: 'add-property'}}]);
  }

  ngAfterViewInit(): void {

this.mobileNavigation();

    const self = this;

    $('.signin').click(function () {
      self.signIn();
    });

    $('.myproperty').click(function () {
      self.navigateResult();
    });

    $('.addproperty').click(function () {
      self.navigateAddProperty();
    });

    $('.signout').click(function () {
      self.signOut();
    });


  }

  mobileNavigation() {
    // Mobile Navigation
    if ($('#nav-menu-container').length) {
      const $mobile_nav = $('#nav-menu-container').clone().prop({
        id: 'mobile-nav'
      });
      $mobile_nav.find('> ul').attr({
        'class': '',
        'id': ''
      });
      $('header').append($mobile_nav);
      $('header').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
      $('header').append('<div id="mobile-body-overly"></div>');
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

      $(document).on('click', '.menu-has-children i', function (e) {
        $(this).next().toggleClass('menu-item-active');
        $(this).nextAll('ul').eq(0).slideToggle();
        $(this).toggleClass('fa-chevron-up fa-chevron-down');
      });

      $(document).on('click', '#mobile-nav-toggle', function (e) {
        $('header').toggleClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('#mobile-body-overly').toggle();
      });

      $(document).click(function (e) {
        const container = $('#mobile-nav, #mobile-nav-toggle');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('header').hasClass('mobile-nav-active')) {
            $('header').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
          }
        }
      });
    } else if ($('#mobile-nav, #mobile-nav-toggle').length) {
      $('#mobile-nav, #mobile-nav-toggle').hide();
    }

  }

}

// @Component({
//   selector: 'app-dialog-data-example-dialog',
//   templateUrl: 'dialogDataExampleDialog.html',
// })
//
// export class DialogDataExampleDialogComponent {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }
