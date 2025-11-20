import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { tokenInterceptor } from './app/core/interceptors/token-interceptor';
import { addIcons } from 'ionicons';
import { cartOutline, giftOutline, helpCircleOutline, personCircleOutline, refreshCircleOutline } from 'ionicons/icons';

addIcons({
  'help-circle-outline': helpCircleOutline,
  'person-circle-outline': personCircleOutline,
  'cart-outline': cartOutline,
   'gift-outline': giftOutline,
  'refresh-circle-outline': refreshCircleOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideIonicAngular(),
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});