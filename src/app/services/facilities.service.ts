import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Rx'
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  constructor(private http: HttpClient) {
  }


  storeFacilitiesInfo(internet, parking, breakfast, language, other, facilityId, propertyId): Observable<object> {

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      }
    );

    console.log('i', internet, 'p', parking, 'b', breakfast, 'l', language.join(','), 'o', other)

    const data = JSON.stringify({
      'user': localStorage.getItem('username'),
      'internet': internet,
      'parking': parking,
      'breakfast': breakfast,
      'language': language.join(','),
      'other': other.join(','),
      'facilityId': facilityId,
      'propertyId': propertyId
    });
    const url = 'http://localhost:8080/facility/facilityInfo';
    return this.http.post(url, data, {headers: headers}).map(
      body => {
        console.log(body)
        return body;
      }
    ).catch(
      err => {
        return Observable.throwError(err);
      });
  }

  getFacilityInfo(propertyId): Observable<object> {
    // const username = localStorage.getItem('username')
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
      }
    );

    const params = new HttpParams().set('propertyId', propertyId);

    const url = 'http://localhost:8080/facility/getFacilityInfo';
    return this.http.get(url, {headers: headers, params: params}).map(
      body => {
        console.log('response', body)
        return body;
      }
    ).catch(
      err => {
        return Observable.throw(err);
      });
  }


}
