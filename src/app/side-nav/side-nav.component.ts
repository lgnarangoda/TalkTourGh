import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceLocalService} from '../services/auth-service-local.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnDestroy, OnInit {


  mobileQuery: MediaQueryList;
  routeLinks: any[];

  opened = false;

  private _mobileQueryListener: () => void;

  ngOnInit() {

  }

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthServiceLocalService) {
    this.mobileQuery = media.matchMedia('(max-width: 1048px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // this.mobileQuery.matches( this.opened = false);
    window.onresize = () => {
      // set screenWidth on screen size change
      if (!this.mobileQuery.matches) {
        this.opened = false;
      }
    };
window.onclick = () =>{
  this.opened = false;
}

    this.routeLinks = [

      {
        label: 'Basic Information',
        link: 'add-property',
        index: 1
      },
      {
        label: 'Location',
        link: 'location',
        index: 2
      },
      {
        label: 'Layout & prizing',
        link: 'layout-prizing',
        index: 3
      }, {
        label: 'Facilities & services',
        link: 'facilities-and-services',
        index: 4
      }, {
        label: 'Add Photos',
        link: 'add-photos',
        index: 5
      }, {
        label: 'Policies',
        link: 'policies',
        index: 6
      },
      {
        label: 'Payments',
        link: 'payments',
        index: 7
      }
    ];


  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }



}
