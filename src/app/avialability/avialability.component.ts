import {Component, OnInit} from '@angular/core';
import {RoomInfoService} from '../services/room-info.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-avialability',
  templateUrl: './avialability.component.html',
  styleUrls: ['./avialability.component.css']
})
export class AvialabilityComponent implements OnInit {

  layoutPrizingForm: FormGroup;
  roomDetails;
  propertyId: number;

  constructor(private roomInfoService: RoomInfoService) {
  }

  ngOnInit() {
    //  this.roomDetails.push('All')

    this.propertyId = Number(localStorage.getItem('propertyId'));
    this.layoutPrizingForm = new FormGroup({

      'roomType': new FormControl('All'),
      'from': new FormControl(null),
      'to': new FormControl(null)

    });
    this.roomInfoService.getRoomInfo(this.propertyId).subscribe(response =>
      this.roomDetails = response
    )

  }

  onProceed(ngform: NgForm) {

  }

  changeProperty(event) {

  }
}
