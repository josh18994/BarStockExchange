import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { IAppState } from 'src/app/state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [
    '../../../assets/bootstrap.min.css',
    './layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store.select(state => state.auth)
      .subscribe((val) => {
        if (!val.loading && val.user.username) {
          this.router.navigate(['/liquor']);
        } else {
          if (this.router.url.includes('account')) this.router.navigate(['/signup']);
          else this.router.navigate([this.router.url]);
        }
      });

  }

}
