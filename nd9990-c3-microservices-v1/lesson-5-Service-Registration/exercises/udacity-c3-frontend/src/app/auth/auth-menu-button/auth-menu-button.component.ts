import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';
import { AuthLoginComponent } from '../auth-login/auth-login.component';
import { AuthRegisterComponent } from '../auth-register/auth-register.component';

@Component({
  selector: 'app-auth-menu-button',
  templateUrl: './auth-menu-button.component.html',
  styleUrls: ['./auth-menu-button.component.scss'],
})
export class AuthMenuButtonComponent implements OnInit {

  constructor(
      public auth: AuthService,
      public modalController: ModalController
    ) {}

  async presentLogin() {
    const modal = await this.modalController.create({
      component: AuthLoginComponent,
    });
    return await modal.present();
  }

  async presentRegister() {
    const modal = await this.modalController.create({
      component: AuthRegisterComponent,
    });
    return await modal.present();
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {}

}
