import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ILiquor } from 'src/app/models/ILiquor';
import { IAppState } from 'src/app/state';
import { AddToCart } from 'src/app/state/cart/cart.actions';


declare var VanillaTilt: any;

@Component({
  selector: 'app-liquor-tile',
  templateUrl: './liquor-tile.component.html',
  styleUrls: ['./liquor-tile.component.scss']
})
export class LiquorTileComponent implements OnInit {

  public authenticatedUser: string;

  @Input() public liquorItem: ILiquor;


  constructor(private store: Store<IAppState>) { }


  ngOnInit(): void {

    this.store.select(state => state.auth).subscribe(val => {
      this.authenticatedUser = val.user.username;
    });
  }


  addToCart(item: ILiquor) {
    this.store.dispatch(new AddToCart(item._id, 1));
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

