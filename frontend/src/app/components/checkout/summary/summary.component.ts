import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state';
import { ICartState } from 'src/app/state/cart/cart.state';
import { Observable } from 'rxjs';
import { getLiquorInfoById } from 'src/app/state/app/app.selectors';
import { UpdateCart } from 'src/app/state/cart/cart.actions';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: [
    // '../../../../assets/bootstrap.min.css',
    './summary.component.scss'
  ]
})
export class SummaryComponent implements OnInit {

  public cartState: Observable<ICartState>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {

    this.cartState = this.store.select(state => state.cart);

  }

  getLiquorDetails(id: string) {
    this.store.select(getLiquorInfoById, {id}).subscribe(val => {
      return val;

    });
  }

  deleteItem(id: string) {
    this.store.dispatch(new UpdateCart(id, 0));
  }

}
