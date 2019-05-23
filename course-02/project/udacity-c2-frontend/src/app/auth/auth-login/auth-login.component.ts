import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  async onSubmit($event) {
    $event.preventDefault();

    if (!this.loginForm.valid) { return; }

    this.auth.login(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value)
      .then((user) => {
        this.modal.dismiss();
      })
      .catch((e) => {
        this.error = e.statusText;
        throw e;
      });

    }

}
