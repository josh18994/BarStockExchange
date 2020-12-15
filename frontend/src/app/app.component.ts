import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './state';
import { TestLiquorApp } from './state/app/app.actions';
import { ILiquorAppState } from './state/app/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public liquors = [];

  constructor(private store: Store<IAppState>) { }


  ngOnInit() {
    this.store.select(state => state.app).subscribe((val) => {
      if (val.data.length) {
        this.liquors.push(...val.data);
      }
    });
  }

  public simulateStore() {
    this.store.dispatch(new TestLiquorApp());
  }
}
