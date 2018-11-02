import {AuthGuard} from '../auth/auth.guard';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {WindowRef} from '../services/WindowRef';
import {cleanSession} from 'selenium-webdriver/safari';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {SigninComponent} from '../signin/signin.component';
import {AuthServiceLocalService} from '../services/auth-service-local.service';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
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

  listPropert(type: string) {
    const newWindow = this.nativeWindow.open('/app-app-component2');
    //   this.Service.assignActivity(type).subscribe(res => {
    //
    //     newWindow.location = '/#/link/' + res;
    //     console.log(res);
    //
    // }
  }


  openDialog() {
    this.dialog.open(SigninComponent, {});
  }

  navigateResult() {
    this.router.navigate(['result-page']);
  }

  navigateAddProperty() {
    this.router.navigate([{outlets: {sidebar: 'add-property'}}]);
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
