import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LiquorInfo } from 'src/app/models/ILiquor';
import { IAppState } from 'src/app/state';
import { getLiquorInfoById } from 'src/app/state/app/app.selectors';
import { UpdateCart } from 'src/app/state/cart/cart.actions';

@Component({
  selector: 'app-liquor-summary-info',
  templateUrl: './liquor-summary-info.component.html',
  styleUrls: ['./liquor-summary-info.component.scss']
})
export class LiquorSummaryInfoComponent implements OnInit {


  @Input('liquorInfo')
  set setLiquor(liquorItem: LiquorInfo) {
    this.quantity = liquorItem.quantity;
    this.store.select(getLiquorInfoById, { id: liquorItem.liquorId }).subscribe(val => {
      this.liquor = val;
    });
  }

  public liquor;
  public quantity;

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
  }

  addOne(): void {
    console.log(this.quantity);

    this.store.dispatch(new UpdateCart(this.liquor._id, this.quantity + 1));
  }


  removeOne(): void {
    this.store.dispatch(new UpdateCart(this.liquor._id, this.quantity - 1));
  }
}
