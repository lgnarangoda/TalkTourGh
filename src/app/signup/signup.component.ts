import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {compareValidator, CompareValidatorDirective} from '../shared/compare-validator.directive';
import {AuthServiceLocalService} from '../services/auth-service-local.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  public alertClase: string;
  public message: string;
  patternLower = '^(?=.*[a-z]).*$';
  noNumeric = '^([^0-9]*)$';
  oneNumeric = '.*[0-9].*'
  constructor(private authService: AuthServiceLocalService) {
  }

  ngOnInit() {

    this.signUpForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.noNumeric) ]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern(this.oneNumeric)]),
      'name': new FormControl(null, [Validators.required, Validators.pattern(this.noNumeric)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'cnfmpassword': new FormControl(null, (compareValidator('password')))
    });
  }

  onSignUp(form: NgForm) {

    if (this.signUpForm.invalid) {
      this.signUpForm.get('name').markAsTouched();
     this.signUpForm.get('username').markAsTouched();
      this.signUpForm.get('email').markAsTouched();
      this.signUpForm.get('password').markAsTouched();
      this.signUpForm.get('cnfmpassword').markAsTouched();
      return;
    } else {
      const username = form.value.username;
      const email = form.value.email;
      const password = form.value.password;
      const name = form.value.name;
      this.authService.signupUser(username, password, email, name).subscribe(response => {
          const msg = response['message'];
          console.log(msg);
          if (response['success']) {
            this.alertClase = 'alert-success';
            this.message = msg;
          } else {
            this.alertClase = 'alert-danger';
            this.message = msg.message;
          }
        }, err => {
          const res = JSON.parse(err.toString());
          this.alertClase = 'alert-danger';
          this.message = res.message.message;
        },
        () => console.log('yay'));
    }

  }
}
