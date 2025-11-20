// src/app/features/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonChip,
  IonLabel,
  IonAvatar,
  IonSkeletonText,
  IonIcon,
  IonButton,
  IonList,
  IonItem,
  IonText,
  IonButtons,
} from '@ionic/angular/standalone';

import { NgFor, NgIf, AsyncPipe, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api';
import { AuthService } from 'src/app/core/services/auth';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonChip,
    IonLabel,
    IonAvatar,
    IonSkeletonText,
    IonIcon,
    IonButton,
    IonList,
    IonItem,
    IonText,
    IonButtons,
    NgFor,
    NgIf,
    AsyncPipe,
    CurrencyPipe,
  ],
})
export class HomePage implements OnInit {
  loading = true;

  categories: any[] = [];
  trendingProducts: any[] = [];
  topSellers: any[] = [];
  newProducts: any[] = [];

  // para mostrar "Hola, Juan" o botón Entrar/Registrar
  currentUser$ = this.auth.currentUser$;

  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.api.get<any>('/home/summary').subscribe({
      next: (res) => {
        this.categories = res.categories || [];
        this.trendingProducts = res.trendingProducts || [];
        this.topSellers = res.topSellers || [];
        this.newProducts = res.newProducts || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  // -------- navegación superior --------

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToHelp() {
    this.router.navigate(['/help']); // cuando tengas la página de ayuda
  }

  goToLogin() {
    this.router.navigate(['/login'], {
      queryParams: { redirectTo: '/home' },
    });
  }

  goToRegister() {
    this.router.navigate(['/register'], {
      queryParams: { redirectTo: '/home' },
    });
  }

  goToAccount() {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.router.navigate(['/account']); // futura pantalla de perfil
    } else {
      this.goToLogin();
    }
  }

  // -------- búsqueda / catálogo --------

  onSearchChange(ev: any) {
    const value = (ev.detail.value || '').trim();
    if (!value) return;
    this.router.navigate(['/catalog'], { queryParams: { q: value } });
  }

  openCategory(cat: any) {
    this.router.navigate(['/catalog'], {
      queryParams: { category: cat.id || cat.slug },
    });
  }

  openProduct(product: any) {
    this.router.navigate(['/product', product.id]);
  }

  verMasTrending() {
    this.router.navigate(['/catalog'], { queryParams: { sort: 'trending' } });
  }

  verMasTopSellers() {
    this.router.navigate(['/catalog'], { queryParams: { sort: 'top' } });
  }

  verMasNew() {
    this.router.navigate(['/catalog'], { queryParams: { sort: 'new' } });
  }
}
