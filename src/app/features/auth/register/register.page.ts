import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth';
import { ChatService } from 'src/app/core/services/chat';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonInput,
    IonButton,
    FormsModule,
    NgIf
  ],
})
export class RegisterPage {
  fullName: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  referredBy: string = "";
  role: 'customer' | 'vendor' = 'customer';

  loading = false;

  // Archivo correcto
  logoFile: File | null = null;
  logoUrl: string | null = null;

  constructor(
    private auth: AuthService,
    private chat: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {
      // si viene desde choose-role
  this.route.queryParams.subscribe(params => {
    if (params['role']) {
      this.role = params['role']; // customer o vendor
    }
  });
  }

  submit() {
    const error = this.validate();
    if (error) {
      alert(error);
      return;
    }

    // Registro de vendedor
    if (this.role === 'vendor') {

      const fd = new FormData();
      fd.append('fullName', this.fullName);
      fd.append('phone', this.phone);
      fd.append('email', this.email);
      fd.append('password', this.password);

      if (this.referredBy) fd.append('referredBy', this.referredBy);
      if (this.logoFile)   fd.append('logo', this.logoFile);

      this.auth.registerVendor(fd).subscribe({
        next: () => this.router.navigate(['/catalog']),
        error: err => alert(err.error?.message || 'Error al registrar vendedor')
      });

      return;
    }

    // Registro de cliente
    this.loading = true;

    this.auth
      .register({
        fullName: this.fullName,
        phone: this.phone,
        email: this.email,
        password: this.password,
        role: this.role,
      })
      .subscribe({
        next: () => {
          this.loading = false;

          // obtener token guardado
          const token = this.auth.getToken();

          if (token) {
            this.chat.initSocket(token);
          }

          this.router.navigate(['/catalog']);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          alert(err.error?.message || 'Error al registrarse.');
        },
      });
  }

  validate() {
    if (!this.fullName.trim()) return 'Nombre es obligatorio';
    if (!this.phone.trim()) return 'Teléfono obligatorio';
    if (this.phone.length < 8) return 'Teléfono inválido';
    if (this.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return null;
  }

  handleFile(ev: any) {
    this.logoFile = ev.target.files[0] || null;

  if (this.logoFile) {
    const reader = new FileReader();
    reader.onload = () => this.logoUrl = reader.result as string;
    reader.readAsDataURL(this.logoFile);
  }
  }

}
