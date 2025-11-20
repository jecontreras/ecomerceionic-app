import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderGlobalComponent } from './shared/header-global/header-global.component';
import { BottomTabsComponent } from './shared/bottom-tabs/bottom-tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, HeaderGlobalComponent, BottomTabsComponent],
})
export class AppComponent {
  constructor() {}
}
