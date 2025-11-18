import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth';
import { ChatService } from 'src/app/core/services/chat';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton,
    FormsModule,
  ],
})
export class LoginPage {

  phone = '';
  password = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private chat: ChatService
  ) {}

  submit() {
    if (!this.phone || !this.password) return;

    this.loading = true;

    this.auth.login(this.phone, this.password).subscribe({
      next: (res) => {
        this.loading = false;

        const token = this.auth.getToken();
        if (token) this.chat.initSocket(token);

        this.router.navigate(['/catalog']);
      },
      error: err => {
        this.loading = false;
        alert(err.error?.message || 'Error al iniciar sesión');
      }
    });
  }
}
