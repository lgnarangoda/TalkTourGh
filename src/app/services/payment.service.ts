import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  StorePayments(isAllowCreditCard, americanExpress, visa, masterCard , diner, invoiceName, tax): Observable<object> {
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
      'username': localStorage.getItem('username'),
      'isAllowCreditCard': isAllowCreditCard,
      'americanExpress': americanExpress,
      'visa': visa,
      'masterCard': masterCard,
      'diner': diner,
      'invoiceName' : invoiceName,
      'tax': tax,

    });
    const url = 'http://localhost:8080/payment/paymentInfo';
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
}
