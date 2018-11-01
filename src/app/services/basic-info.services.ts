import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BasicInfoServices {

  dataCreate = {};
  public message: string;

  constructor(private http: HttpClient) {
  }

  storeBasicInfo(username, propertyType, propertyName, noOfRooms, starRating, contactName, phoneNo, altphoneNo, streetAdd,
                 addressLine2, country, city, postalCode): Observable<object> {

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      }
    );

    console.log(headers)

    console.log(localStorage.getItem('currentUser'))
    const data = JSON.stringify({
      'username': username,
      'propertyType': propertyType,
      'propertyName': propertyName,
      'noOfRooms': noOfRooms,
      'starRating': starRating,
      'contactName': contactName,
      'phoneNumber': phoneNo,
      'altphoneNo': altphoneNo,
      'streetAdd': streetAdd,
      'addressLine2': addressLine2,
      'country': country,
      'city': city,
      'postalCode': postalCode
    });
    const url = 'http://localhost:8080/info/basicInfo';
    return this.http.post(url, data, {headers: headers}).map(
      body => {
        console.log(body)
        return body;
      }
    ).catch(
      err => {
        return Observable.throw(err);
      });
  }
  updateBasicInfo(username, propertyType, propertyName, noOfRooms, starRating, contactName, phoneNo, altphoneNo, streetAdd,
                 addressLine2, country, city, postalCode): Observable<object> {

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      }
    );

    console.log(headers)

    console.log(localStorage.getItem('currentUser'))
    const data = JSON.stringify({
      'username': username,
      'propertyType': propertyType,
      'propertyName': propertyName,
      'noOfRooms': noOfRooms,
      'starRating': starRating,
      'contactName': contactName,
      'phoneNumber': phoneNo,
      'altphoneNo': altphoneNo,
      'streetAdd': streetAdd,
      'addressLine2': addressLine2,
      'country': country,
      'city': city,
      'postalCode': postalCode
    });
    const params = new HttpParams().set('propertyId', localStorage.getItem('propertyId'));
    const url = 'http://localhost:8080/info/updateInfo';
    return this.http.post(url, data, {headers: headers, params: params}).map(
      body => {
        console.log(body)
        return body;
      }
    ).catch(
      err => {
        return Observable.throw(err);
      });
  }

  getBasicInfo(id): Observable<object> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
      }
    );
    // const params = new URLSearchParams();

    const params = new HttpParams().set('propertyId', id);
    //params.append('username', 'lgnarangoda')

    const url = 'http://localhost:8080/info/getBasicInfo';
    return this.http.get(url, {headers: headers, params: params}).map(
      body => {
        console.log('f', body)
        return body;
      }
    ).catch(
      err => {
        return Observable.throw(err);
      });


    // return this.propertyInfo;
  }

  getPropertyOfUser(): Observable<object> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
      }
    );
    // const params = new URLSearchParams();

    //const params = new HttpParams().set('propertyId', id);
    //params.append('username', 'lgnarangoda')

    const url = 'http://localhost:8080/info/getPropertyOfUser';
    return this.http.get(url, {headers: headers}).map(
      body => {
        console.log('f', body)
        return body;
      }
    ).catch(
      err => {
        return Observable.throw(err);
      });


    // return this.propertyInfo;
  }


  getPropertyOfUserWithImages(): Observable<object> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
      }
    );
    // const params = new URLSearchParams();

    //const params = new HttpParams().set('propertyId', id);
    //params.append('username', 'lgnarangoda')

    const url = 'http://localhost:8080/result/getPropertyOfUserWithImages';
    return this.http.get(url, {headers: headers}).map(
      body => {
        console.log('f', body)
        return body;
      }
    ).catch(
      err => {
        if (err.status === 0) {
          this.message = 'HttpResponseError'
        } else {
          this.message = 'Username or password incorrect!'
        }
        this.dataCreate = JSON.stringify({success: false, message: this.message});
        return Observable.throwError(
          this.dataCreate);

      });


    // return this.propertyInfo;
  }
}

