// import { Injectable } from '@angular/core';
// import {HttpHeaders} from '@angular/common/http';
// import {Observable} from 'rxjs/index';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class SaveDetailsService {
//
//   constructor() { }
//
//   storeAllInfo(propertyType, propertName, noOfRooms, starRating, contactName, phoneNo, altphoneNo): Observable<object> {
//
//     const headers = new HttpHeaders(
//       {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json ',
//         'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
//       }
//     );
//
//     console.log(headers)
//     //  const header = new HttpHeaders({'Content-Type': 'application/json'});
//     //  header.append('Accept', 'application/json ');
//     // header.append('Authorization', 'Bearer {eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIz
//     // MiIsImlhdCI6MTUzNTMxMzAxNCwiZXhwIjoxNTM1OTE3ODE0fQ.5I1AtKv3
//     // T9dJvD16lv8Jmo1oQFPAu1TpN2K12lmlIWNEMvlmVKDHt9EkPSpp_QVQndAwbKYPttj1R2SXCNA2gA}')
//     // const options    = new RequestOptions({ headers: headers });
//     console.log(localStorage.getItem('currentUser'))
//     const data = JSON.stringify({
//       'propertyType': propertyType,
//       'propertName': propertName,
//       'noOfRooms': noOfRooms,
//       'starRating': starRating
//     });
//     const url = 'http://localhost:8080/info/basicInfo';
//     return this.http.post(url, data,{headers: headers}).map(
//       body => {
//         console.log(body)
//         return body;
//       }
//     ).catch(
//       err => {
//         return Observable.throw(err);
//       });
//   }
// }
