// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from './api';

export interface User {
  id: number;
  fullName: string;
  phone: string;
  role: 'admin' | 'company_owner' | 'vendor' | 'customer';
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private tokenKey = 'token';

  constructor(private api: ApiService) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      // Podrías cargar /me aquí si luego lo necesitas
    }
  }

  // ---------------------
  // LOGIN
  // ---------------------
  login(phone: string, password: string) {
    return this.api.post<AuthResponse>('/auth/login', { phone, password }).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        this.currentUserSubject.next(res.user);
      })
    );
  }

  // ---------------------
  // REGISTER (NUEVO)
  // ---------------------
  register(data: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
    role: 'customer' | 'vendor';
  }) {
    return this.api.post<AuthResponse>('/auth/register', data).pipe(
      tap(res => {
        // Guardar token
        localStorage.setItem(this.tokenKey, res.token);

        // Guardar usuario en memoria
        this.currentUserSubject.next(res.user);
      })
    );
  }

  registerVendor(formData: FormData) {
  return this.api.post<AuthResponse>('/auth/register-vendor', formData).pipe(
    tap(res => {
      localStorage.setItem('token', res.token);
      this.currentUserSubject.next(res.user);
    })
  );
}


  // ---------------------
  // LOGOUT
  // ---------------------
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  // ---------------------
  // Helpers
  // ---------------------
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

}
