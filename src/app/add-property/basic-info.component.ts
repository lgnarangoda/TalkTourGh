import {Component, OnInit} from '@angular/core';


import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {BasicInfoServices} from '../services/basic-info.services';
import {ActivatedRoute, Router} from '@angular/router';
import {SigninComponent} from '../signin/signin.component';
import {MatDialog} from '@angular/material';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class ShoppingEditComponent implements OnInit {

  hotelDetailsForms: FormGroup;
  description = 'Hotel : Accommodation for travellers often offering restaurants, meeting rooms and other guest services';
  objectKeys = Object.keys;
  items = {
    'Hotel': ' Accommodation for travellers often offering restaurants, meeting rooms and other guest services',
    'Guest House': 'Private home with separate living facilities for host and guest',
    'Apartment': 'Furnished and self-catering accommodation available for short- and long-term rental'
  };

  response;

  constructor(private basicInfo: BasicInfoServices, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
    // if(localStorage.getItem('propertyId')) {
    //   localStorage.setItem('propertyId', localStorage.getItem('propertyId'));
    // }
  }

  ngOnInit() {
    // localStorage.setItem('propertyId', this.route.snapshot.paramMap.get('id'));
    if(localStorage.getItem('propertyId')) {
      this.basicInfo.getBasicInfo(localStorage.getItem('propertyId')).subscribe(response => {


        this.response = response;
        if (response.toString().length > 0) {
          this.updatePage()
        }

      });
    }



    this.hotelDetailsForms = new FormGroup({
      'property_details': new FormGroup({
        'propertyType': new FormControl('Hotel', Validators.required),
        'propertyName': new FormControl('', Validators.required),
        'noOfRooms': new FormControl('', Validators.required),
        'starRating': new FormControl('N/A')
      }),

      'contactName': new FormControl('', Validators.required),
      'phoneNo': new FormControl('', Validators.required),
      'altphoneNo': new FormControl(''),
      'streetAdd': new FormControl('', Validators.required),
      'addressLine2': new FormControl('', Validators.required),
      'country': new FormControl('Sri Lanka', Validators.required),
      'city': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),

    });

    // console.log('id here', this.route.snapshot.paramMap.get('id'))
  }

  updatePage() {
    this.hotelDetailsForms = new FormGroup({
      'property_details': new FormGroup({
        'propertyType': new FormControl(this.response.propertyType, Validators.required),
        'propertyName': new FormControl(this.response.propertyName, Validators.required),
        'noOfRooms': new FormControl(this.response.noOfRooms, Validators.required),
        'starRating': new FormControl(this.response.starRating)
      }),

      'contactName': new FormControl(this.response.contactName, Validators.required),
      'phoneNo': new FormControl(this.response.phoneNumber, Validators.required),
      'altphoneNo': new FormControl(this.response.altphoneNo),
      'streetAdd': new FormControl(this.response.streetAdd, Validators.required),
      'addressLine2': new FormControl(this.response.addressLine2, Validators.required),
      'country': new FormControl(this.response.country, Validators.required),
      'city': new FormControl(this.response.city, Validators.required),
      'postalCode': new FormControl(this.response.postalCode, Validators.required),

    });
  }

  changeProperty(property) {
    const propert = this.hotelDetailsForms.get('property_details.propertyType').value
    this.description = propert + ':' + this.items[propert]
  }


  onProceed(form: NgForm) {
    // this.dialog.open(MapComponent, {});

    if (this.hotelDetailsForms.valid) {
      this.storeData(form)

    } else {
      //this.hotelDetailsForms.markAsTouched();
      for (const inner of Object.keys(this.hotelDetailsForms.controls)) {
        this.hotelDetailsForms.get(inner).markAsTouched();
      }
      this.hotelDetailsForms.get('property_details.propertyName').markAsTouched();
      this.hotelDetailsForms.get('property_details.noOfRooms').markAsTouched();
    }
  }

  storeData(form: NgForm) {
    const propertyType = form.value.property_details.propertyType;
    const propertyName = form.value.property_details.propertyName;
    const noOfRooms = form.value.property_details.noOfRooms;
    const starRating = form.value.property_details.starRating;
    const contactName = form.value.contactName;
    const phoneNo = form.value.phoneNo;
    const altphoneNo = form.value.altphoneNo;
    const streetAdd = form.value.streetAdd;
    const addressLine2 = form.value.addressLine2;
    const country = form.value.country;
    const city = form.value.city;
    const postalCode = form.value.postalCode;
    const username = localStorage.getItem('username')

    if (localStorage.getItem('propertyId')) {
      this.basicInfo.updateBasicInfo(username, propertyType, propertyName, noOfRooms, starRating, contactName, phoneNo, altphoneNo, streetAdd,
        addressLine2, country, city, postalCode)
        .subscribe(result => {
          localStorage.setItem('propertyId', Object.assign(result).propertyId);
          this.router.navigate([{outlets: {sidebar: 'location'}}]);

        });
    }
    else {
      this.basicInfo.storeBasicInfo(username, propertyType, propertyName, noOfRooms, starRating, contactName, phoneNo, altphoneNo, streetAdd,
        addressLine2, country, city, postalCode)
        .subscribe(result => {
          localStorage.setItem('propertyId', Object.assign(result).propertyId);
          this.router.navigate([{outlets: {sidebar: 'location'}}]);

        });
    }

  }


}

