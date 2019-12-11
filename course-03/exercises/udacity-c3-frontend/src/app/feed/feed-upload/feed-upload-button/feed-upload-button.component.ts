import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeedUploadComponent } from '../feed-upload.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed-upload-button',
  templateUrl: './feed-upload-button.component.html',
  styleUrls: ['./feed-upload-button.component.scss'],
})
export class FeedUploadButtonComponent implements OnInit, OnDestroy {

  isLoggedIn: Boolean;
  loginSub: Subscription;

  constructor(private modalController: ModalController, private auth: AuthService) { }

  ngOnInit() {
    this.auth.currentUser$.subscribe((user) => {
      this.isLoggedIn = user !== null;
    });
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  async presentUploadForm(ev: any) {
    const modal = await this.modalController.create({
      component: FeedUploadComponent,
    });
    return await modal.present();
  }

}
