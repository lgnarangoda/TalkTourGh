import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapService} from '../services/map.service';

import {FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // @ViewChild('search') public searchElement: ElementRef;
  // lat: String = '39.8282';
  // lng: String = '-98.5795';
  propertyId: number;
  public lat: number;
  public lng: number;
  public searchControl: FormControl;
  public zoom = 10;
  private geoCoder;
  public currentAddress: string;
  response;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private map: MapService, private locationService: MapService, private router: Router) {
  }


  ngOnInit() {
    this.propertyId = Number(localStorage.getItem('propertyId'));
    // this.setCurrentPosition();
    this.searchControl = new FormControl();



      this.map.getLocationFromDb(this.propertyId).subscribe(
        response => {
          if (response) {
          this.response = response;
          this.lat = this.response.latitude;
          this.lng = this.response.longitude;
            this.updateAdress();
          } else {
            this.map.getLocation().subscribe(
              data => {
                console.log(data);
                this.lat = data.latitude;
                this.lng = data.longitude;
                this.updateAdress();
              }
            )
          }
        }
      );


    this.autocomplete();




  }
autocomplete() {
  this.mapsAPILoader.load().then(() => {
    this.geoCoder = new google.maps.Geocoder;
    const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ['address']
    });
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {

        // get the place result
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();

        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        // set latitude, longitude and zoom
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
  });

}

updateAdress(){

  this.geoCoder.geocode({'location': {lat: this.lat, lng: this.lng}}, (results, status) => {
    console.log(results);
    console.log(status);
    if (status === 'OK') {
      if (results[0]) {
        console.log('aaaa');
        this.currentAddress = results[0].formatted_address;

        this.searchElementRef.nativeElement.value = results[0].formatted_address;
        // console.log(this.searchElementRef.nativeElement.value);
        // infowindow.setContent(results[0].formatted_address);

      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}
  // google.maps.event.addListener(map, 'click', function(event) {
  //   placeMarker(event.latLng);
  // });
  markerDragEnd($event: any) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.updateAdress();
  }

  setPosition($event: any) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.updateAdress();
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  navigateLayout() {
    this.locationService.storeLocation(this.propertyId, this.lat, this.lng).subscribe(response => {
      this.router.navigate([{outlets: {sidebar: 'layout-prizing'}}]);
    })
  }
}
