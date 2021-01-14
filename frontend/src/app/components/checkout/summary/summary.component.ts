import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LiquorInfo } from 'src/app/models/ILiquor';
import { IProductInfo } from 'src/app/models/IProductInfo';
import { IAppState } from 'src/app/state';
import { getLiquorInfoById } from 'src/app/state/app/app.selectors';
import { CheckoutUserCart, UpdateCart } from 'src/app/state/cart/cart.actions';
import { ICartState } from 'src/app/state/cart/cart.state';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: [
    // '../../../../assets/bootstrap.min.css',
    './summary.component.scss'
  ]
})
export class SummaryComponent implements OnInit {

  public cartState: ICartState;
  public busy: boolean = false;

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store.select(state => state.cart).subscribe(cart => {
      this.cartState = cart;
      this.busy = cart.busy;
    });
  }

  deleteItem(id: string) {
    this.store.dispatch(new UpdateCart(id, 0));
  }

  async checkout(cartState: ICartState) {
    const payload = await this.createPayload(cartState.liquor);
    this.store.dispatch(new CheckoutUserCart(payload));
  }

  async createPayload(cartLiquor: LiquorInfo[]): Promise<IProductInfo[]> {
    let payload: IProductInfo[] = [];
    cartLiquor.forEach(item => {
      let liquorPrice = '';
      this.store.select(getLiquorInfoById, { id: item.liquor._id }).subscribe(val => {
        liquorPrice = val.price.currentPrice;
      });
      payload.push({
        liquor: item.liquor._id,
        price: liquorPrice,
        quantity: item.quantity.toString()
      } as IProductInfo);
    })
    return payload;
  }

}
