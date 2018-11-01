import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {PoliciesService} from '../services/policies.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  cancellationsDays = ['1 day before arrival', '2 day before arrival', '3 day before arrival', '7 daybefore arrival', '14 day before arrival'];
  checked = false;
  policiesForm: FormGroup;
  // filterDay = ('#filterDay input:radio:checked').val();
  checkInFrom = '';
  optionList = ['Yes' , 'No'];
  isAllowPets = false;
  propertyId: number;

  constructor(private policyInfo: PoliciesService) {
    this.propertyId = Number(localStorage.getItem('propertyId'));
  }

  ngOnInit() {
    this.policiesForm = new FormGroup({
      'cancellationsDays': new FormControl('7 daybefore arrival', Validators.required),
      'pay': new FormControl('of the frist night', Validators.required),
      'checkInFrom': new FormControl(null),
      'checkInTo': new FormControl(null),
      'checkOutFrom': new FormControl(null),
      'checkOutTo': new FormControl(null),
      'children': new FormControl('Yes', Validators.required),
      'allowPets': new FormControl('No', Validators.required),
      'chargesForPets': new FormControl('Pets can stay free', Validators.required),
    });

  }

  onSubmitplicies(form: NgForm) {
    const cancellationsDays = form.value.cancellationsDays;
    const pay = form.value.pay;
    const   checkInFrom = form.value.checkInFrom;
    const   checkInTo =  form.value.checkInTo;
    const checkOutFrom = form.value.checkOutFrom;
    const checkOutTo = form.value.checkOutTo;
    const children = form.value.children;
    const allowPets = form.value.allowPets;
    const chargesForPets = form.value.chargesForPets;

    this.policyInfo.StorePolicies(cancellationsDays, pay, checkInFrom, checkInTo, checkOutFrom, checkOutTo, children ,
      allowPets, chargesForPets, this.propertyId)
      .subscribe(response => {
        if (response['success']) {
        }

      });


  }


  IsAllowPetss(answer) {
    if (answer) {
      this.isAllowPets = true
    } else {
      this.isAllowPets = false
    }
  }
}

