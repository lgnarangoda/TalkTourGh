import {Injectable} from '@angular/core';
import {PropertInfo, ContanctInfo, LayoutPrizing} from './formData.model';
import index from '@angular/cli/lib/cli';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable()
export class FormDataService {
 // private formData: FormData = new FormData();
  private contactInfo: ContanctInfo = new ContanctInfo() ;
  private propertyInfo: PropertInfo = new PropertInfo();
  private isPersonalFormValid = false;
  private isWorkFormValid = false;
  private isAddressFormValid = false;
  private roomType: Array<String> = new Array<String>();




  room: LayoutPrizing = {
    roomsType: 'Please select',
    LnoOfRooms: '1',
    smoking: 'smoke',
    bedType: 'Single bed / 90-130 cm wide',
    noOfBeds: '1',
    guest: '1',
    roomSize: '',
    roomSizeType: 'squre meter',
    curency: '',
    price: '',
  };
  private layoutPrizing: Array<LayoutPrizing> = new Array<LayoutPrizing>(this.room);
  private index = 0;
  private save = true;
constructor(private http: HttpClient) {
}

  getPropertInfo(): PropertInfo {
    // Return the Personal data
    // const basicInfo: PropertInfo = {
    //   propertyType: this.formData.propertyType,
    //   propertyName: this.formData.propertyName,
    //   noOfRooms: this.formData.noOfRooms,
    //   starRating: this.formData.starRating
    // };
    return this.propertyInfo;
  }






  getPropertInfo2(): Observable<object> {
    const username = localStorage.getItem('username')
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
      }
    );
   // const params = new URLSearchParams();

    const params = new HttpParams().set('username', username);
    //params.append('username', 'lgnarangoda')

    const url = 'http://localhost:8080/info/getBasicInfo';
    return this.http.get(url, {headers: headers, params : params}).map(
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










  //const params = new HttpParams().set('username', 'username');










  // getRoomType() {
  //   this.roomType = []
  //   for (const roomtype of this.layoutPrizing) {
  //     this.roomType.push(roomtype.roomsType)
  //   }
  //   return this.roomType;
  // }

  setPropertInfo(data: PropertInfo) {
    // Update the Personal data only when the Personal Form had been validated successfully
    // this.isPersonalFormValid = true;
    // this.formData.propertyType = data.propertyType;
    // this.formData.propertyName = data.propertyName;
    // this.formData.starRating = data.starRating;
    // this.formData.noOfRooms = data.noOfRooms;

    this.propertyInfo.propertyType = data.propertyType;
    this.propertyInfo.propertyName = data.propertyName;
    this.propertyInfo.starRating = data.starRating;
    this.propertyInfo.noOfRooms = data.noOfRooms;
  }

  setContanctInfo(data: ContanctInfo) {
    // this.formData.contactName = data.contactName;
    // this.formData.contactNo = data.contactNo;
    // this.formData.altContactNo = data.altContactNo;
    // this.formData.streetAdd = data.streetAdd;
    // this.formData.addressLine2 = data.addressLine2;
    // this.formData.country = data.country;
    // this.formData.city = data.city;
    // this.formData.postalCode = data.postalCode;


    this.contactInfo.contactName = data.contactName;
    this.contactInfo.contactNo = data.contactNo;
    this.contactInfo.altContactNo = data.altContactNo;
    this.contactInfo.streetAdd = data.streetAdd;
    this.contactInfo.addressLine2 = data.addressLine2;
    this.contactInfo.country = data.country;
    this.contactInfo.city = data.city;
    this.contactInfo.postalCode = data.postalCode;

  }

  getContanctInfo(): ContanctInfo {
    // Return the Personal data
    // const basicInfo2: ContanctInfo = {
    //   contactName: this.formData.contactName,
    //   contactNo: this.formData.contactNo,
    //   altContactNo: this.formData.altContactNo,
    //   streetAdd: this.formData.streetAdd,
    //   addressLine2: this.formData.addressLine2,
    //   country: this.formData.country,
    //   city: this.formData.city,
    //   postalCode: this.formData.postalCode
    // };
    return this.contactInfo;
  }

  setLayoutPrizing(data: LayoutPrizing, save) {
    const room: LayoutPrizing = {
      roomsType: data.roomsType,
      LnoOfRooms: data.LnoOfRooms,
      smoking: data.smoking,
      bedType: data.bedType,
      noOfBeds: data.noOfBeds,
      guest: data.guest,
      roomSize: data.roomSize,
      roomSizeType: data.roomSizeType,
      curency: data.curency,
      price: data.price,
    };
    if (this.save) {
      this.layoutPrizing.push(room)
    } else {
      this.layoutPrizing[this.index] = room
    }


  }

  getLayoutPrizing(indexOfRooms): LayoutPrizing {
    // console.log(this.layoutPrizing[0])
    return this.layoutPrizing[this.index];
  }

  getLayoutPrizing2() {
   // console.log(this.layoutPrizing)
    return this.layoutPrizing;
  }

  setIndex(index, save) {
    this.index = index
    this.save = save
  }

  deleteRoom(index) {
    this.layoutPrizing.splice(index, 1)
  }
}
