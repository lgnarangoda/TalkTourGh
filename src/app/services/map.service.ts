import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Rx'


interface Location {
  latitude: number;
  longitude: number;
}



@Injectable({
  providedIn: 'root'
})


export class MapService {

  constructor(private http: HttpClient) {
  }

  getLocation() {
    return this.http.get<Location>('http://api.ipapi.com/check?access_key=9d3adbe73fb2fb62cf3eadb4d008a51b');
  }



  storeLocation(propertyId, lat, lng): Observable<object>  {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      }
    );


    const data = JSON.stringify({
      'propertyId': propertyId,
      'latitude': lat,
      'longitude': lng,

    });
    const url = 'http://localhost:8080/location/storeLocation';
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

  getLocationFromDb(id): Observable<object> {
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
    const params = new HttpParams().set('propertyId', id);
    const url = 'http://localhost:8080/location/getLocation';
    return this.http.get(url, {headers: headers, params: params}).map(
      body => {
        console.log('f', body)
        return body;
      }
    ).catch(
      err => {
        return Observable.throwError(err);

      });


    // return this.propertyInfo;
  }
}
