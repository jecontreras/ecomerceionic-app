import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonSearchbar
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  cartOutline,
  personCircleOutline,
  notificationsOutline,
  helpCircleOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

addIcons({
  'cart-outline': cartOutline,
  'person-circle-outline': personCircleOutline,
  'notifications-outline': notificationsOutline,
  'help-circle-outline': helpCircleOutline,
});

@Component({
  selector: 'app-header-global',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonSearchbar,
    NgIf
  ],
  templateUrl: './header-global.component.html',
  styleUrls: ['./header-global.component.scss']
})
export class HeaderGlobalComponent {
  constructor(private router: Router) {}

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

  goToHelp() {
    this.router.navigate(['/help']);
  }

  onSearch(ev: any) {
    const val = ev.detail.value?.trim();
    if (!val) return;

    this.router.navigate(['/catalog'], { queryParams: { q: val } });
  }
}
