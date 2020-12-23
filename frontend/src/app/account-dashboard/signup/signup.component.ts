import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/services/alert.service';
import { IAppState } from 'src/app/state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    '../../../assets/bootstrap.min.css',
    './signup.component.scss']
})
export class SignupComponent implements OnInit {
  public loading = false;
  public submitted = false;
  public form: FormGroup;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

  }


  validateName() {
    console.log("lost focus");

  }

}
