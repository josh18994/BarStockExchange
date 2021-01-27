import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { ILiquor } from 'src/app/models/ILiquor';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChild('lineChart') lineChart: ElementRef;
  @Input() public liquor: ILiquor;
  @Input() public difference;

  generateRandomData() {
    const price = [];
    const date = [];
    while (price.length <= 12) {
      const randomNumber = Math.floor(Math.random() * (22 - 17 + 1) + 17);
      price.push(randomNumber);
      date.push(randomNumber.toFixed(2));
    }
    return {price, date};
  }

  getData() {
    if (this.liquor.price?.history?.length > 12) {
      const price = this.liquor.price.history.map(x => +x.price);
      const date = this.liquor.price.history.map(x => x.date);

      return {price, date};
    }
    return this.generateRandomData();
  }

  ngAfterViewInit() {

    const data = this.getData();
    const suggestedMin = Math.min(...data.price) - 2;
    const suggestedMax = Math.max(...data.price) + 5;
    const labels = data.date;

    const ctx = this.lineChart.nativeElement.getContext('2d');
    const purpleOrangeGradient = ctx.createLinearGradient(0, 0, 0, 150);

    if(+this.difference > 0) {
      purpleOrangeGradient.addColorStop(0, 'rgba(255, 105, 38, 0.5) ');
      purpleOrangeGradient.addColorStop(1, 'rgba(255, 105, 38, 0) ');
    } {
      purpleOrangeGradient.addColorStop(0, 'rgba(2, 199, 10, 0.5) ');
      purpleOrangeGradient.addColorStop(1, 'rgba(2, 199, 10, 0) ');
    }
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;


    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        // labels: ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00'],
        labels,
        datasets: [
          {
            // data: [25.0, 24, 22.2, 23, 23, 22.0, 22.2, 21, 20.0, 18.4, 19.1, 17.4],
            data: data.price,
            backgroundColor: purpleOrangeGradient,
            hoverBackgroundColor: purpleOrangeGradient,
            hoverBorderWidth: 1,
            hoverBorderColor: 'purple',
            borderWidth: 2,
            borderColor: +this.difference > 0 ? '#FF6926' : '#02c70a',
            lineTension: 0
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                suggestedMin,
                suggestedMax,
                display: false
              }
            }
          ]
          ,
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
