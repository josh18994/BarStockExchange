import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/services/alert.service';
import { IAppState } from 'src/app/state';
import { SetTitle } from 'src/app/state/app/app.actions';
import { CheckUserExists, ClearUsernameExists, LoginUser } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss'
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  public loading = false;
  public submitted = false;
  public form: FormGroup;
  public customError;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {
    this.store.dispatch(new SetTitle('Login'));
  }

  // TODO TRY TESTING WITH NGONDESTROY, and remove the error when new value is recieved.


  ngOnInit(): void {



    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.store.select(state => state.auth).subscribe((val) => {
      if (val.validate.usernameExists !== undefined) {
        this.customError = !val.validate.usernameExists;
      } else this.customError = false;
    });
  }

  get f() { return this.form.controls; }

  login() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(new LoginUser(this.form.get('username').value, this.form.get('password').value));
  }

  validateUsername() {
    if (!this.form.untouched) {
      this.store.dispatch(new CheckUserExists(this.form.get('username').value));
    }
  }


  ngOnDestroy() {
    this.store.dispatch(new ClearUsernameExists());
  }



}
