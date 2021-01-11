import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ILiquor } from 'src/app/models/ILiquor';
import { IAppState } from 'src/app/state';
import { SetTitle } from 'src/app/state/app/app.actions';
import { UpdateCart } from 'src/app/state/cart/cart.actions';


declare var VanillaTilt: any;

@Component({
  selector: 'app-liquor-tile',
  templateUrl: './liquor-tile.component.html',
  styleUrls: ['./liquor-tile.component.scss']
})
export class LiquorTileComponent implements OnInit {

  public authenticatedUser: string;
  public cart;

  @Input() public liquorItem: ILiquor;

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


  updateCart(item: ILiquor) {
    const quantity = this.cart.filter(x => x.liquor._id === item._id)[0]?.quantity;
    this.store.dispatch(new UpdateCart(item._id, !!quantity ? quantity + 1 : 1));
  }

  getQuantity(id: string) {
    return this.cart.filter(x => x.liquor._id === id)[0]?.quantity || '';
  }
}

