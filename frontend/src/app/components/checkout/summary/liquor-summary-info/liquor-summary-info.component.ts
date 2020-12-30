import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LiquorInfo } from 'src/app/models/ILiquor';
import { IAppState } from 'src/app/state';
import { getLiquorInfoById } from 'src/app/state/app/app.selectors';

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
    console.log(this.liquor);

  }

}
