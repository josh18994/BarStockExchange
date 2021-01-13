import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state';
import { CalculateTotal } from 'src/app/state/cart/cart.actions';

@Component({
  selector: 'app-grandtotal',
  templateUrl: './grandtotal.component.html',
  styleUrls: ['./grandtotal.component.scss']
})
export class GrandtotalComponent implements OnInit {

  @Input('cart')
  set cartInfo(cart) {
    this.store.dispatch(new CalculateTotal());
  }

  @Input('liquor')
  set liquorInfo(liquor) {
    this.store.dispatch(new CalculateTotal());
  }

  public cartTotal;

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {

    this.store.select(state => state.cart).subscribe(val => {
      this.cartTotal = val.total;
    })

  }

}
