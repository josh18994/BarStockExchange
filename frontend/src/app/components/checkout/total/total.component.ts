import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ILiquor, LiquorInfo } from 'src/app/models/ILiquor';
import { IAppState } from 'src/app/state';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {
  public liquorList: Array<ILiquor>;
  public userCart: Array<LiquorInfo>;
  public subTotal = 0;
  public grandTotal = 0;
  public tax = 0;

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {

    this.store.select(state => state.app).subscribe(app => {
      this.liquorList = app.data;
    });

    this.store.select(state => state.cart).subscribe(cart => {
      this.subTotal = +cart.total;
      this.userCart = cart.liquor;
    });
  }

  calculateTax() {
    this.grandTotal = +(this.subTotal + this.subTotal * 0.06 + +this.subTotal * 0.02).toFixed(2);
    this.tax = +(this.grandTotal - this.subTotal).toFixed(2);
    return '$' + this.tax.toString();
  }

}
