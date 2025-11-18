// src/app/features/catalog/product-list.page.ts
import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
} from '@ionic/angular/standalone';
import { AsyncPipe, CurrencyPipe, NgIf, NgFor } from '@angular/common';
import { Product, ProductService } from 'src/app/core/services/product';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    NgIf,
    NgFor,
    CurrencyPipe,
    AsyncPipe,
  ],
})
export class ProductListPage implements OnInit {
  products: Product[] = [];
  loading = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.load();
  }

  load(event?: any) {
    this.loading = true;
    this.productService.getPublicProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
        event?.target?.complete();
      },
      error: () => {
        this.loading = false;
        event?.target?.complete();
      },
    });
  }

  trackById(_: number, item: Product) {
    return item.id;
  }
}
