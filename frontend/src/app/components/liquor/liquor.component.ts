import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state';
import { StartConnection, TestLiquorApp } from 'src/app/state/app/app.actions';

@Component({
  selector: 'app-liquor',
  templateUrl: './liquor.component.html',
  styleUrls: ['./liquor.component.scss']
})
export class LiquorComponent implements OnInit {

  public liquorList;

  constructor(private store: Store<IAppState>) { }


  ngOnInit() {
    this.store.select(state => state.app)
      .subscribe((val) => {
        if (val.data.length) {
          this.liquorList = val.data;
        }
      });

    this.store.dispatch(new StartConnection());
    this.store.dispatch(new TestLiquorApp());
  }

}
