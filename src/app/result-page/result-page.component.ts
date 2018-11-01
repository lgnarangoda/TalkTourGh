import {Component, OnInit} from '@angular/core';
import {BasicInfoServices} from '../services/basic-info.services';
import {UploadFileService} from '../services/upload-file.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {AuthGuard} from '../auth/auth.guard';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  isEdit$: Observable<boolean>;
  propertyArray;
  address = '';
  coverPhoto;
  verificationCardImagePath: any[] = [];
  imageList: any[] = [];
  photoInput: string;
  Product = {};
  progress_complete = false;
  public alertClase: string;
  public message: string;
  constructor(private basicInfo: BasicInfoServices, private uploadFileService: UploadFileService,
              private router: Router, private domSanitizer: DomSanitizer, private  authService: AuthGuard) {
  }

  ngOnInit() {


    //this.isEdit$ = this.authService.getEdit;
    //this.address = response[0].streetAdd

    this.basicInfo.getPropertyOfUserWithImages().subscribe(response => {
      const res = Object.assign(response)

        console.log(response['basicInfo']['0'].propertyName)
        if (Object.assign(response['basicInfo']).length > 0) {
          this.propertyArray = response['basicInfo'];

          console.log(response);

        }



    });

    this.uploadFileService.getAllImagesByuserId().subscribe(response => {
      const that = this;
      that.verificationCardImagePath = [];
      this.imageList = [];
      Object.assign(response).forEach(function (item) {
        that.verificationCardImagePath.push({
          image: that.domSanitizer.bypassSecurityTrustResourceUrl(item.image),
          propertyId: item.propertyId
        });
      });

      this.coverPhoto = this.verificationCardImagePath[0];
this.progress_complete = true;

    });

  }

  navigateAvailability() {
    // window.open('/administration-panel')
    this.router.navigate(['/aviability']);
  }

  navigateToEditPanel(propertyId) {
    //this.authService.editClick();
    localStorage.setItem('propertyId', propertyId);
    // this.router.navigate([{outlets: {sidebar: ['add-property', propertyId]}}]);
    this.router.navigate([{outlets: {sidebar: 'add-property'}}]);
  }

  navigateAddProperty() {
    localStorage.removeItem('propertyId');
    this.router.navigate([{outlets: {sidebar: 'add-property'}}]);
  }

  deleteProperty(id) {
console.log(id)
  }

}
