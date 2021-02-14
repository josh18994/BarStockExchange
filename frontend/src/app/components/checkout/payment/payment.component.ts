import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: [
    './payment.component.scss'
  ]
})
export class PaymentComponent implements OnInit {


  public form: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['john smith'],
      card_number: ['1272-5529-9494-9100'],
      expiration_m: ['02'],
      expiration_d: ['17'],
      cvc: ['322']
    });
  }

}
