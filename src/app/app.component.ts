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



    // Mobile Navigation
    if ($('#nav-menu-container').length) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({
        id: 'mobile-nav'
      });
      $mobile_nav.find('> ul').attr({
        'class': '',
        'id': ''
      });
      $('app-header').append($mobile_nav);
      $('app-header').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
      $('app-header').append('<div id="mobile-body-overly"></div>');
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

      $(document).on('click', '.menu-has-children i', function(e) {
        $(this).next().toggleClass('menu-item-active');
        $(this).nextAll('ul').eq(0).slideToggle();
        $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });

      $(document).on('click', '#mobile-nav-toggle', function(e) {
        $('app-root').toggleClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('#mobile-body-overly').toggle();
      });

      $(document).click(function(e) {
        var container = $("#mobile-nav, #mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('app-root').hasClass('mobile-nav-active')) {
            $('app-root').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
          }
        }
      });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Smooth scroll for the menu and links with .scrollto classes
    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
      event.preventDefault();
      if (location.hostname == this.hostname) {
        var target = $(this.hash);
        if (target.length) {
          var top_space = 0;

          if ($('#header').length) {
            top_space = $('#header').outerHeight();

            if( ! $('#header').hasClass('header-fixed') ) {
              top_space = top_space - 20;
            }
          }

          $('html, app-root').animate({
            scrollTop: target.offset().top - top_space
          }, 1500, 'easeInOutExpo');

          if ($(this).parents('.nav-menu').length) {
            $('.nav-menu .menu-active').removeClass('menu-active');
            $(this).closest('li').addClass('menu-active');
          }

          if ($('app-root').hasClass('mobile-nav-active')) {
            $('app-root').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
          }
          return false;
        }
      }
    });





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
