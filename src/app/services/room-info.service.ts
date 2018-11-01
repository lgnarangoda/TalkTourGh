import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class RoomInfoService {

  constructor(private http: HttpClient) {
  }

  storeRoomInfo(roomType, noOfRooms, smoking, bedType, noOfBeds, guest, roomSize, roomSizeType,
                curency, price, propertyId): Observable<object> {

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      }
    );
    const data = JSON.stringify({
      'username': localStorage.getItem('username'),
      'roomType': roomType,
      'noOfRooms': noOfRooms,
      'smoking': smoking,
      'bedType': bedType,
      'noOfBeds': noOfBeds,
      'amountOfGuest': guest,
      'roomSize': roomSize,
      'roomSizeType': roomSizeType,
      'curency': curency,
      'price': price,
      'propertyId': propertyId
    });
    const url = 'http://localhost:8080/room/roomInfo';
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

  getRoomInfo(propertyId): Observable<object> {
    const username = localStorage.getItem('username');
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
      }
    );

    const params = new HttpParams().set('propertyId', propertyId);
    const url = 'http://localhost:8080/room/getRoomInfo';
    return this.http.get(url, {headers: headers, params: params}).map(
      body => {
        console.log(body)
        return body;
      }
    ).catch(
      err => {
        return Observable.throwError(err);
      });
  }

  deleteRoom(roomId): Observable<object> {
    // const username = localStorage.getItem('username')
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
      }
    );

    const params = new HttpParams().set('roomId', roomId);

    const url = 'http://localhost:8080/room/deleteRoom';
    return this.http.get(url, {headers: headers, params: params}).map(
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
