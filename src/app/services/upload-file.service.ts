import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadFileService {

  constructor(private http: HttpClient) {
  }

  uploadImages(image, propertyId): Observable<object> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      }
    );
    const data = [];
    image.forEach(function (item) {
      data.push({
        'image': item.image,
        'propertyId': propertyId
      })
    });
    const url = 'http://localhost:8080/image/upload';
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

  deleteImages(id): Observable<object> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      }
    );

    const url = 'http://localhost:8080/image/delete/' + id;
    return this.http.delete(url, {headers: headers}).map(
      body => {
        console.log(body)
        return body;
      }
    ).catch(
      err => {
        return Observable.throw(err);
      });
  }


  getAllImages(propertyId): Observable<object> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      }
    );
    const url = 'http://localhost:8080/image/upload/?propertyId=' + propertyId;
    return this.http.get(url, {headers: headers}).map(
      body => {
        console.log(body)
        return body;
      }
    ).catch(
      err => {
        return Observable.throw(err);
      });
  }

  getAllImagesByuserId(): Observable<object> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      }
    );
    const url = 'http://localhost:8080/image/all/upload';
    return this.http.get(url, {headers: headers}).map(
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
