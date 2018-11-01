import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {PaymentService} from '../services/payment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payementForm: FormGroup;
  invoiceNames = ['Test', 'test']
  isCreditCardAllow = false;

  constructor(private paymentInfo: PaymentService, private router: Router) {
  }

  ngOnInit() {

    this.payementForm = new FormGroup({
      'creditCard': new FormGroup({
        'isAllowCreditCard': new FormControl('No', Validators.required),
        'americanExpress': new FormControl(false, Validators.required),
        'visa': new FormControl(false, Validators.required),
        'masterCard': new FormControl(false, Validators.required),
        'diner': new FormControl(false, Validators.required),
      }),

      'invoiceName': new FormControl(null, Validators.required),
      'tax': new FormControl('No', Validators.required)
    })
  }

  changeIsAllow(value) {
    if (value === 'Yes') {
      this.isCreditCardAllow = true;
    } else {
      this.isCreditCardAllow = false;
    }
  }

  onSubmitPayments(form: NgForm) {
    console.log(form.value.creditCard.isAllowCreditCard)

    const isAllowCreditCard = form.value.creditCard.isAllowCreditCard;
    const americanExpress = form.value.creditCard.americanExpress;
    const visa = form.value.creditCard.visa;
    const masterCard = form.value.creditCard.masterCard;
    const diner = form.value.creditCard.diner;
    const invoiceName = form.value.invoiceName;
    const tax = form.value.tax;

    // this.paymentInfo.StorePayments(isAllowCreditCard, americanExpress, visa, masterCard, diner, invoiceName, tax).subscribe
    // (response => {
    //   console.log(response)
    //
    //
    // });
    this.router.navigate(['/result-page']);

  }

}
