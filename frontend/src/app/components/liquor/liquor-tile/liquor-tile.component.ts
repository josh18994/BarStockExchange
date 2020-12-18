import { Component, Input, OnInit } from '@angular/core';
import { ILiquor } from 'src/app/models/ILiquor';

declare var VanillaTilt: any;

@Component({
  selector: 'app-liquor-tile',
  templateUrl: './liquor-tile.component.html',
  styleUrls: ['./liquor-tile.component.scss']
})
export class LiquorTileComponent implements OnInit {


  @Input() public liquorItem: ILiquor;


  constructor() { }


  ngOnInit(): void {
    // VanillaTilt.init(document.querySelector('.box'), {
    //   max: 25,
    //   speed: 400
    // });
    // VanillaTilt.init(document.querySelectorAll('.box'));

  }
}

