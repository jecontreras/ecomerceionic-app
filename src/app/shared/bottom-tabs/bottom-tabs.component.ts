import { Component } from '@angular/core';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import {
  homeOutline,
  listOutline,
  cartOutline,
  personOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

addIcons({
  'home-outline': homeOutline,
  'list-outline': listOutline,
  'cart-outline': cartOutline,
  'person-outline': personOutline
});

@Component({
  selector: 'app-bottom-tabs',
  standalone: true,
  imports: [
    IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterLink
  ],
  templateUrl: './bottom-tabs.component.html',
  styleUrls: ['./bottom-tabs.component.scss']
})
export class BottomTabsComponent {}
