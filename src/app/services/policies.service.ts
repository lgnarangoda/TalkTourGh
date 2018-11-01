import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {

  constructor(private http: HttpClient) {
  }

  public StorePolicies(cancellationsDays, pay, checkInFrom, checkInTo, checkOutFrom, checkOutTo, children,
                       allowPets, chargesForPets, propertyId): Observable<object> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      }
    );
    const data = JSON.stringify({
      'username': localStorage.getItem('username'),
      'cancellationsDays': cancellationsDays,
      'pay': pay,
      'checkInFrom': checkInFrom,
      'checkInTo': checkInTo,
      'checkOutFrom': checkOutFrom,
      'checkOutTo': checkOutTo,
      'children': children,
      'allowPets': allowPets,
      'chargesForPets': chargesForPets,
      'propertyId': propertyId
    });
    const url = 'http://localhost:8080/policy/policyInfo';
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
