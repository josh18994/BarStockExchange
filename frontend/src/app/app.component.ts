import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './state';
import { StartConnection, TestLiquorApp } from './state/app/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public liquorList;

  constructor(private store: Store<IAppState>) { }


  ngOnInit() {
    this.store.select(state => state.app)
      .subscribe((val) => {
        if (val.data.length) {
          this.liquorList = val.data;
        }
      });

    this.store.dispatch(new TestLiquorApp());
    this.store.dispatch(new StartConnection());
  }

}
