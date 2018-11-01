import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

import {CanActivate, Router} from '@angular/router';
import {state} from '@angular/animations';
import {Observable} from 'rxjs/Rx';
import {AuthGuard} from '../auth/auth.guard';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider, LinkedinLoginProvider
} from 'angular-6-social-login';
import {MatDialog, MatDialogRef} from '@angular/material';
import {SignupComponent} from '../signup/signup.component';

import {AuthServiceLocalService} from '../services/auth-service-local.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  // isLoggedIn$: Observable<boolean>;
  signInForm: FormGroup;
  public alertClase: string;
  public message: string;
  isValidFormSubmitted = null;
  pattern = '^(?=.*[a-z]).*$';


  constructor(private authService: AuthServiceLocalService, private  authGuard: AuthGuard,
              public dialog: MatDialog, private router: Router, private socialAuthService: AuthService,
              public dialogRef: MatDialogRef<SigninComponent>) {

  }


  ngOnInit() {
    // this.isLoggedIn$ = this.authGuard.isLoggedIn;
    this.signInForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(this.pattern)]),
      'password': new FormControl(null, Validators.required)

    });
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'linkedin') {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ', userData);
        // Now sign-in with userData
        // ...

      }
    );


  }


  onSignIn(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;

    this.authService.signInForm(username, password).subscribe(response => {
        const res = JSON.parse(response.toString());
        console.log(res);
        if (res.success) {


          this.alertClase = 'alert-success';
          this.message = res.message;

          this.authGuard.isLoggedIn;
          //this.router.navigate([{outlets: {sidebar: 'result-page'}}]);


        } else {
          this.alertClase = 'alert-danger';
          this.message = res.message;
        }
      }, err => {
        const res = JSON.parse(err.toString());
        this.alertClase = 'alert-danger';
        this.message = res.message;
      },
      () => console.log('yay'));

  }

  get username() {
    return this.signInForm.get('username');
  }

  signUp() {
    this.closeDialog();
    const dialogRef =  this.dialog.open(SignupComponent, {
      width: '600px',
    });
  }
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}

