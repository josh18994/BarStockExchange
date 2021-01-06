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
    const quantity = this.cart.filter(x => x.liquorId === item._id)[0]?.quantity;
    this.store.dispatch(new UpdateCart(item._id, !!quantity ? quantity + 1 : 1));
  }

  getQuantity(id: string) {
    return this.cart.filter(x => x.liquorId === id)[0]?.quantity || '';
  }


  generateStyle(category): object {
    switch (category) {
      case 'whiskey':
        return {
          background: `url('../../../../assets/test/whiskey.jpeg') no-repeat`,
          'background-size': '122%',
          'background-position-y': '0%',
          'background-position-x': '41%'
        };

      case 'rum':
        return {
          background: `url('../../../../assets/test/rum.jpeg') no-repeat`,
          'background-size': '112%',
          'background-position-y': '0%',
          'background-position-x': '42%'
        };

      case 'beer':
        return {
          background: `url('../../../../assets/test/beer.jpeg') no-repeat`,
          'background-size': '136%',
          'background-position-y': '49%',
          'background-position-x': '46%'
        };

      case 'wine':
        return {
          background: `url('../../../../assets/test/wine.jpeg') no-repeat`,
          'background-size': '100%',
          'background-position-y': '30%',
          'background-position-x': '0%'
        };

      case 'vodka':
        return {
          background: `url('../../../../assets/test/vodka.jpeg') no-repeat`,
          'background-size': '104%',
          'background-position-y': '9%',
          'background-position-x': '0%'
        };
      case 'tequila':
        return {
          background: `url('../../../../assets/test/tequila.jpeg') no-repeat`,
          'background-size': '104%',
          'background-position-y': '9%',
          'background-position-x': '0%'
        };

      case 'gin':
        return {
          background: `url('../../../../assets/test/gin.jpeg') no-repeat`,
          'background-size': '104%',
          'background-position-y': '9%',
          'background-position-x': '0%'
        };
    }

  }
}

