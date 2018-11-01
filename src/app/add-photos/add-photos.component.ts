import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {UploadFileService} from '../services/upload-file.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.css']
})
export class AddPhotosComponent implements OnInit {

  verificationCardImagePath: any[] = [];
  imageList: any[] = [];
  photoInput: string;
  propertyId: number;

  constructor(private domSanitizer: DomSanitizer, private uploadFileService: UploadFileService, private router: Router) {
  }

  ngOnInit() {
    this.propertyId = Number(localStorage.getItem('propertyId'));
    this.getFile();
  }

  uploadFile() {
    this.uploadFileService.uploadImages(this.imageList, this.propertyId).subscribe(response => {
      this.getFile();
    });
    this.router.navigate([{outlets: {sidebar: ['policies']}}]);
  }

  getFile() {
    this.uploadFileService.getAllImages(this.propertyId).subscribe(response => {
      const that = this;
      that.verificationCardImagePath = [];
      this.imageList = [];
      Object.assign(response).forEach(function (item) {
        that.verificationCardImagePath.push({image: that.domSanitizer.bypassSecurityTrustResourceUrl(item.image), id: item.id});
      });
    });
  }

  setImage(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {

        this.imageList.push({image: reader.result, id: null});
        this.verificationCardImagePath.push({image: this.domSanitizer.bypassSecurityTrustResourceUrl(reader.result), id: null});
      };
    }
    this.photoInput = null;
  }

  deletePhoto(id, item) {
    const index = this.verificationCardImagePath.findIndex(photo => photo.image === item);
    const index2 = this.imageList.findIndex(photo => photo.image === item);
    if (index >= 0) {
      this.verificationCardImagePath.splice(index, 1);
    }

    if (index2 >= 0) {
      this.imageList.splice(index, 1);
    }
    if (id !== null) {
      this.uploadFileService.deleteImages(id).subscribe(response => {
        console.log(response);
      });
    }
  }
}
