import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChild('lineChart') lineChart: ElementRef;

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngAfterViewInit() {

    const arr = [];
    while (arr.length <= 12) {
      const r = this.randomIntFromInterval(17, 22);
      arr.push(r);
    }

    const ctx = this.lineChart.nativeElement.getContext('2d');
    const purpleOrangeGradient = ctx.createLinearGradient(0, 0, 0, 150);
    purpleOrangeGradient.addColorStop(0, 'rgba(27, 160, 152, 0.5) ');
    purpleOrangeGradient.addColorStop(1, 'rgba(27, 160, 152, 0) ');
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 6;


    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00'],
        datasets: [
          {
            // data: [25.0, 24, 22.2, 23, 23, 22.0, 22.2, 21, 20.0, 18.4, 19.1, 17.4],
            data: arr,
            backgroundColor: purpleOrangeGradient,
            hoverBackgroundColor: purpleOrangeGradient,
            hoverBorderWidth: 1,
            hoverBorderColor: 'purple',
            borderWidth: 2,
            borderColor: '#1BA098',
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
                suggestedMin: 15,
                suggestedMax: 27,
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
