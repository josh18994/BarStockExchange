import { Component, HostListener, OnInit } from '@angular/core';
import { debounce } from 'lodash';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public innerWidth: any;
  constructor() {
    this.onResize = debounce(this.onResize, 50, {leading: false, trailing: true});
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

}
