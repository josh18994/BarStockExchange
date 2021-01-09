import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { IAppState } from 'src/app/state';
import { StartConnection, GetLiquorList } from 'src/app/state/app/app.actions';


@Component({
  selector: 'app-liquor',
  templateUrl: './liquor.component.html',
  styleUrls: ['./liquor.component.scss']
})
export class LiquorComponent implements OnInit, AfterViewInit {


  public liquorList;
  public total;

  constructor(private store: Store<IAppState>) { }

  @ViewChild('myChart') myChart: ElementRef;

  ngAfterViewInit() {

    const draw = Chart.controllers.line.prototype.draw;
    Chart.controllers.line = Chart.controllers.line.extend({
      draw() {
        draw.apply(this, arguments);
        const ctx = this.chart.chart.ctx;
        const jStroke = ctx.stroke;
        ctx.stroke = function () {
          ctx.save();
          ctx.shadowColor = '#000';
          ctx.shadowBlur = 25;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 8;
          jStroke.apply(this, arguments)
          ctx.restore();
        };
      }
    });
  }

  ngOnInit() {
    this.store.select(state => state.app)
      .subscribe((val) => {
        if (val.data.length) {
          this.liquorList = val.data;
          this.total = val.inventoryTotal;
        }
      });

    this.store.dispatch(new StartConnection());
    this.store.dispatch(new GetLiquorList('8', '1', '', ''));
  }

  onPageChange({previousPageIndex, pageIndex, pageSize, length}) {
    pageIndex += 1;
    this.store.dispatch(new GetLiquorList(pageSize.toString(), pageIndex.toString(), '', ''));
  }
}

