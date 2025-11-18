import { Component } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register-role',
  templateUrl: './register-role.page.html',
  styleUrls: ['./register-role.page.scss'],
  imports: [IonContent, IonButton],
})
export class RegisterRolePage {

  constructor(private router: Router) {}

  choose(role: 'customer' | 'vendor') {
    this.router.navigate(['/register'], { queryParams: { role } });
  }

}
