import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceLocalService {

  public message: string;

  dataCreate = {};


  constructor(private http: HttpClient) {

  }

  //
  // sign up service //
  //
  signupUser(username: string, password: string, email: string, name: string): Observable<string | object> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    const data = JSON.stringify({'name': name, 'username': username, 'email': email, 'password': password});
    const header1 = new HttpHeaders({'Content-Type': 'application/json'});
    const url = 'http://localhost:8080/api/auth/signup';
    return this.http.post(url, data, {headers: header}).map(
      body => {

        return body;
      }
    ).catch(
      err => {

        // this.message = err.error.errors[0].defaultMessage;
        this.message = err.error;
        this.dataCreate = JSON.stringify({success: true, message: this.message});
        // const accessToken = body.accessToken;
        console.log(this.dataCreate);
        return Observable.throw(
          this.dataCreate);
      })
  };

  // private handleError(error: Response | any) {
  //   // In a real world app, you might use a remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }

  //
  // sign in service //
  //
  signInForm(username: string, password: string): Observable<string | object> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    const data = JSON.stringify({'usernameOrEmail': username, 'password': password});
    const header1 = new HttpHeaders({'Content-Type': 'application/json'});
    const url = 'http://localhost:8080/api/auth/signin';
    return this.http.post(url, data, {headers: header}).map(
      body => {
        if (body['accessToken']) {

          this.storeToken(body['accessToken']);

          this.dataCreate = JSON.stringify({success: true, message: 'Logging succesful!'});
          console.log(this.dataCreate);

          this.getNameOfUser().subscribe(response => {
              this.storeName(response);
            }
          )
          return this.dataCreate;


        } else {
          throw new Error('Valid token not returned');
        }

      }
    ).catch((e) => {
      if (e.status === 0) {
        this.message = 'HttpResponseError'
      } else {
        this.message = 'Username or password incorrect!'
      }
      this.dataCreate = JSON.stringify({success: false, message: this.message});
      return Observable.throw(
        this.dataCreate);
    })
  };


  getNameOfUser(): Observable<object> {

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
      }
    );

    const url = 'http://localhost:8080/api/auth/getNameOfUser';
    return this.http.get(url, {headers: headers, responseType: 'text' as 'json'}).map(
      body => {

        return body;
      }
    ).catch(
      err => {
        return Observable.throw(err);
      });

  }


  storeToken(token) {
    localStorage.setItem('currentUser', token);
  }
  storeName(name) {
    localStorage.setItem('name', name);
  }

  removeToken() {
    localStorage.removeItem('currentUser');
  }
}
