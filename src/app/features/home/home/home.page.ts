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
} from '@ionic/angular/standalone';

import { NgFor, NgIf, AsyncPipe, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api';

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

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    // 🔹 ADAPTA ESTOS ENDPOINTS A TUS RUTAS REALES DE SAILS
    // Puedes unificar en /home/summary o separarlos como prefieras
    this.api.get<any>('/home/summary').subscribe({
      next: (res) => {
        this.categories       = res.categories       || [];
        this.trendingProducts = res.trendingProducts || [];
        this.topSellers       = res.topSellers       || [];
        this.newProducts      = res.newProducts      || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onSearchChange(ev: any) {
    const value = (ev.detail.value || '').trim();
    if (!value) return;
    // navegar al catálogo con búsqueda
    this.router.navigate(['/catalog'], { queryParams: { q: value } });
  }

  openCategory(cat: any) {
    this.router.navigate(['/catalog'], { queryParams: { category: cat.id || cat.slug } });
  }

  openProduct(product: any) {
    // asumiendo que tienes /product/:id
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
