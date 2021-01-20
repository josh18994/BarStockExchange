import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ILiquor } from 'src/app/models/ILiquor';
import { IAppState } from 'src/app/state';
import { SetTitle } from 'src/app/state/app/app.actions';
import { UpdateCart } from 'src/app/state/cart/cart.actions';

@Component({
  selector: 'app-liquor-tile',
  templateUrl: './liquor-tile.component.html',
  styleUrls: ['./liquor-tile.component.scss']
})
export class LiquorTileComponent implements OnInit {

  @Input('liquorItem')
  set liquorInfo(liquorItem) {
    this.liquor = liquorItem;
    if (this.liquor.price?.history) {

      this.originalPrice = this.liquor.price.history.filter(x => new Date(x.date).getDay() === new Date().getDay())[0].price;
      const difference = +this.liquor.price.currentPrice - +this.originalPrice;
      const percent = (difference / +this.originalPrice) * 100;
      this.style = difference > 0 ? 'red' : 'green';
      this.percentPriceDifference =  percent.toFixed(2);
    }
  }

  public authenticatedUser: string;
  public cart;
  public liquor: ILiquor;
  public percentPriceDifference;
  public style;
  public originalPrice;


  // TODO: Try binding to {{title}}
  constructor(private store: Store<IAppState>) {
    this.store.dispatch(new SetTitle('Shop'));
  }


  ngOnInit(): void {

    this.store.select(state => state.auth).subscribe(val => {
      this.authenticatedUser = val.user.username;
    });

    this.store.select(state => state.cart).subscribe(val => {
      this.cart = val.liquor;
    });

  }


  calculateDifference() {
    if (this.liquor.price?.history) {

      const originalPrice = this.liquor.price.history.filter(x => new Date(x.date).getDay() === new Date().getDay())[0].price;
      const difference = +this.liquor.price.currentPrice - +originalPrice;
      console.log(difference);
      const percent = (difference / +originalPrice) * 100;

      return percent.toFixed(2);
    }
  }

  getOriginalNumber() {
    if (this.liquor.price?.history) {

      return this.liquor.price.history.filter(x => new Date(x.date).getDay() === new Date().getDay())[0].price;

    }
  }


  updateCart(item: ILiquor) {
    const quantity = this.cart.filter(x => x.liquor._id === item._id)[0]?.quantity;
    this.store.dispatch(new UpdateCart(item._id, !!quantity ? quantity + 1 : 1));
  }

  getQuantity(id: string) {
    return this.cart.filter(x => x.liquor._id === id)[0]?.quantity || '';
  }
}

