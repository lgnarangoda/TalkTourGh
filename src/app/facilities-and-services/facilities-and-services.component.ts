import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {FacilitiesService} from '../services/facilities.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-facilities-and-services',
  templateUrl: './facilities-and-services.component.html',
  styleUrls: ['./facilities-and-services.component.css']
})
export class FacilitiesAndServicesComponent implements OnInit {

  facilitiesAndServiceForm: FormGroup;
  languages = ['English', 'Spanish']
  parkingAndInternet = ['no', 'yes,free', 'yes,paid']
  facilities = ['Bar', 'Family rooms', 'Air conditioning', 'Swimming pool', 'Non-smoking rooms', 'Garden']
  fac = [];
  breakfasts = ['no', 'yes, it included in price', 'yes, it is optional']
  lan: string;
  languageResponse;
  response;
  facilityId: string;
  propertyId: number;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private fb: FormBuilder, private facilityInfo: FacilitiesService, private router: Router) {
    iconRegistry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add-icon.svg'));
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'));

  }

  ngOnInit() {
    this.propertyId = Number(localStorage.getItem('propertyId'));
    this.facilitiesAndServiceForm = this.fb.group({
      'internet': new FormControl('no'),
      'parking': new FormControl('no'),
      'breakfast': new FormControl('no'),
      // 'languagess': new FormArray([new FormControl('English')]),
      'languagess': this.fb.array([new FormControl('English')]),
      'facilities': this.fb.array([])
    });

    const control = <FormArray>this.facilitiesAndServiceForm.controls['facilities'];
    const control2 = <FormArray>this.facilitiesAndServiceForm.controls['languagess'];
    // let procedureList = this.fb.array([]);

    this.facilities.forEach(element => {
      control.push(this.setOther(element));
    });
    //
    // this.languages.forEach(element => {
    //   control2.push(this.fb.control(element));
    // })
    //
    if (this.propertyId) {
      this.getInfor();
    }

  }

  getInfor() {
    this.facilityInfo.getFacilityInfo(this.propertyId).subscribe(response => {
      if (response.toString().length > 0) {
        this.response = response[0];
        this.facilityId = this.response.facilityId;
      this.languageResponse = this.response.language.split(',');
        this.updatePage();
        // this.lan.setValue(this.languageResponse);
      }
    });
  }

  setOther(item) {
    return this.fb.group({
      item: [item],
      checked: [false]
    });
  }

  updateOther(item) {
    return this.fb.group({
      item: [item],
      checked: [this.response.other.split(',').filter(x => x === item).length === 0 ? false : true]
    });
  }

  addLanguages() {
    (<FormArray>this.facilitiesAndServiceForm.get('languagess')).push(new FormControl('null'))


    console.log(this.facilitiesAndServiceForm.get('languagess'))
    console.log((<FormArray>this.facilitiesAndServiceForm.get('languagess')).controls);
  }

  removeLanguage(index) {
    console.log((<FormArray>this.facilitiesAndServiceForm.get('languagess')).controls);
    (<FormArray>(this.facilitiesAndServiceForm.get('languagess'))).removeAt(index)
  }

  test() {
    const facilities = [];
    this.facilitiesAndServiceForm.value.facilities.forEach((item, index) => {
      if (item.checked) {
        facilities.push(item.item);
      }
    });
    return facilities;
  }

  onSubmitFacilities(form: NgForm) {
    const internet = form.value.internet
    const parking = form.value.parking
    const languagess = form.value.languagess
    const breakfast = form.value.breakfast

    this.facilityInfo.storeFacilitiesInfo(internet, parking, breakfast, languagess, this.test(), this.facilityId, this.propertyId).subscribe(response => {
      this.getInfor();
      this.router.navigate([{outlets: {sidebar: ['add-photos']}}]);
     // this.router.navigate(['/add-photos']);
    });
  }


  updatePage() {
    this.facilitiesAndServiceForm = this.fb.group({
      'internet': new FormControl(this.response.internet),
      'parking': new FormControl(this.response.parking),
      'breakfast': new FormControl(this.response.breakfast),
      'languagess': this.fb.array([]),
      'facilities': this.fb.array([])
    });

    const control = <FormArray>this.facilitiesAndServiceForm.controls['facilities'];
    const control2 = <FormArray>this.facilitiesAndServiceForm.controls['languagess'];
    // let procedureList = this.fb.array([])

    this.facilities.forEach(element => {
      control.push(this.updateOther(element));
    });
    console.log( this.languageResponse);
    this.languageResponse.forEach(element => {
      control2.push(this.fb.control(element));
    });

    // this.languages.forEach(element => {
    //   control2.push(this.fb.control(element));
    // })
  }

}

