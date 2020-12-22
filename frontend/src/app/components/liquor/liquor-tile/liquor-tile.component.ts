import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ILiquor } from 'src/app/models/ILiquor';
import { IAppState } from 'src/app/state';
import { GetLiquorById } from 'src/app/state/app/app.actions';

declare var VanillaTilt: any;

@Component({
  selector: 'app-liquor-tile',
  templateUrl: './liquor-tile.component.html',
  styleUrls: ['./liquor-tile.component.scss']
})
export class LiquorTileComponent implements OnInit {


  @Input() public liquorItem: ILiquor;


  constructor(private store: Store<IAppState>) { }


  ngOnInit(): void {
    // VanillaTilt.init(document.querySelector('.box'), {
    //   max: 25,
    //   speed: 400
    // });
    // VanillaTilt.init(document.querySelectorAll('.box'));

  }

  test() {
    this.store.dispatch(new GetLiquorById());
  }
}

