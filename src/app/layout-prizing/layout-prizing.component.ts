import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormDataService} from '../data/formData.service';
import {LayoutPrizing} from '../data/formData.model';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {RoomInfoService} from '../services/room-info.service';
import {MapService} from '../services/map.service';


@Component({
  selector: 'app-layout-prizing',
  templateUrl: './layout-prizing.component.html',
  styleUrls: ['./layout-prizing.component.css']
})
export class LayoutPrizingComponent implements OnInit {

  roomTypes = ['Please select', 'Single', 'Double', 'Twin', 'Twin/Double', 'Triple'];
  noOfRooms = ['1', '2', '3', '4', '5'];
  noOfBeds = ['1', '2', '3', '4', '5'];
  noOfPersons = ['1', '2', '3', '4', '5'];
  roomSizeTypes = ['squre meter', 'squre feet'];
  bedTypes = ['Single bed / 90-130 cm wide', 'Double bed / 131-150 cm wide'];
  smokings = ['smoke', 'Non-smoke'];

  layoutPrizingForm: FormGroup;
  roomType;
  response;
  IsUpdate = false;
  norooms = true;
  roomId = 0;
  roomTypeValue;
  noOfRoomsValue;
  smokingValue;
  bedTypeValue;
  noOfBedsValue;
  guestValue;
  roomSizeValue;
  roomSizeTypeValue;
  curencyValue;
  priceValue;
  propertyId: number;

  constructor(private roomInfoService: RoomInfoService,
              private formDataService: FormDataService,
              public dialog: MatDialog,
              private router: Router) {

  }

  ngOnInit() {
    this.propertyId = Number(localStorage.getItem('propertyId'));
    if (this.propertyId !== undefined) {
      this.getRoomInfo();
    }
    this.layoutPrizingForm = new FormGroup({
      'roomDetails': new FormGroup({
        'roomsType': new FormControl('Please select', Validators.required),
        'LnoOfRooms': new FormControl(''),
        'smoking': new FormControl('smoke'),
        'bedType': new FormControl('Single bed / 90-130 cm wide'),
        'noOfBeds': new FormControl(''),
        'guest': new FormControl(''),
        'roomSize': new FormControl(''),
        'roomSizeType': new FormControl('squre meter'),
        'curency': new FormControl({value: 'US$/per night', disabled: true}),
        'price': new FormControl(''),
      }),


    });


  }

  onSubmitLayout() {

    this.loadFormValue();

    this.roomInfoService.storeRoomInfo(this.roomTypeValue, this.noOfRoomsValue,
      this.smokingValue, this.bedTypeValue, this.noOfBedsValue, this.guestValue,
      this.roomSizeValue, this.roomSizeTypeValue, this.curencyValue, this.priceValue, this.propertyId, this.roomId)
      .subscribe(response => {
        // const res = JSON.parse(response.toString());
        // console.log(res)

        // if (response['success']) {
        //
        //   this.getRoomInfo()
        // }
        this.getRoomInfo();
        this.IsUpdate = false;
        this.roomId = 0;

      });
  }

  update() {
    this.onSubmitLayout();

  }

  loadFormValue() {
    this.roomTypeValue = this.layoutPrizingForm.get('roomDetails.roomsType').value;
    this.noOfRoomsValue = this.layoutPrizingForm.get('roomDetails.LnoOfRooms').value;
    this.smokingValue = this.layoutPrizingForm.get('roomDetails.smoking').value;
    this.bedTypeValue = this.layoutPrizingForm.get('roomDetails.bedType').value;
    this.noOfBedsValue = this.layoutPrizingForm.get('roomDetails.noOfBeds').value;
    this.guestValue = this.layoutPrizingForm.get('roomDetails.guest').value;
    this.roomSizeValue = this.layoutPrizingForm.get('roomDetails.roomSize').value;
    this.roomSizeTypeValue = this.layoutPrizingForm.get('roomDetails.roomSizeType').value;
    this.curencyValue = this.layoutPrizingForm.get('roomDetails.curency').value;
    this.priceValue = this.layoutPrizingForm.get('roomDetails.price').value;
  }


  getRoomInfo() {
    this.roomInfoService.getRoomInfo(this.propertyId).subscribe(response => {

      this.response = response;
      console.log(this.response);
      if (this.response.length > 0) {
        this.norooms = false;
      } else {
        this.norooms = true;
      }
    });
  }


  editRoom(i, roomId) {

    this.updatePage(i);
    this.IsUpdate = true;
    this.roomId = roomId;
  }

  deleteRoom(roomId) {
    this.roomInfoService.deleteRoom(roomId).subscribe(response => {
      console.log(response);
      this.getRoomInfo();
    });

  }

  updatePage(roomId) {

    const roomType = this.response[roomId].roomType;
    const noOfRooms = this.response[roomId].noOfRooms;
    const smoking = this.response[roomId].smoking;
    const bedType = this.response[roomId].bedType;
    const noOfBeds = this.response[roomId].noOfBeds;
    const guest = this.response[roomId].guest;
    const roomSize = this.response[roomId].roomSize;
    const roomSizeType = this.response[roomId].roomSizeType;
    //const curency = this.response[roomId].curency;
    const price = this.response[roomId].price;

    this.layoutPrizingForm = new FormGroup({
      'roomDetails': new FormGroup({
        'roomsType': new FormControl(roomType, Validators.required),
        'LnoOfRooms': new FormControl(noOfRooms),
        'smoking': new FormControl(smoking),
        'bedType': new FormControl(bedType),
        'noOfBeds': new FormControl(noOfBeds),
        'guest': new FormControl(guest),
        'roomSize': new FormControl(roomSize),
        'roomSizeType': new FormControl(roomSizeType),
        'curency': new FormControl({value: 'US$/per night', disabled: true}),
        'price': new FormControl(price),
      }),


    });
  }
}



