import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/services/alert.service';
import { IAppState } from 'src/app/state';
import { LoginUser } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../assets/bootstrap.min.css',
    './login.component.scss'
  ]
})
export class LoginComponent implements OnInit {
  public loading = false;
  public submitted = false;
  public form: FormGroup;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.store.select(state => state.auth)
      .subscribe((val) => {
        if (val.user.username) {
          this.router.navigate(['/liquor']);
        }
        this.loading = val.loading;
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(new LoginUser(this.form.get('username').value, this.form.get('password').value));
  }

  validateUsername() {
    console.log('lost focus');

  }

}
