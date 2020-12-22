import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/services/alert.service';
import { IAppState } from 'src/app/state';
import { CheckUserExists, LoginUser } from 'src/app/state/auth/auth.actions';

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
  public customError = false;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder) { }

// TODO TRY TESTING WITH NGONDESTROY, and remove the error when new value is recieved.


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    this.store.select(state => state.auth).subscribe((val) => {
      if (val.validate.usernameExists !== undefined && !val.validate.usernameExists) {
        this.customError = true;
      }
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
    console.log(this.form.get('username').value);

    this.store.dispatch(new CheckUserExists(this.form.get('username').value));
  }

}
