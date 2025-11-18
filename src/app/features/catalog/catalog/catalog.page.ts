import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonSkeletonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';

import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api';

@Component({
  standalone: true,
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonSkeletonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    NgFor,
    NgIf
  ],
})
export class CatalogPage implements OnInit {

  products: any[] = [];
  loading = true;
  page = 1;
  hasMore = true;

  q: string | null = null;
  category: string | null = null;
  sort: string | null = null;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.q        = params['q'] || null;
      this.category = params['category'] || null;
      this.sort     = params['sort'] || null;

      this.page = 1;
      this.products = [];
      this.loadProducts();
    });
  }

  loadProducts(event?: any) {
    this.loading = this.page === 1;

    // ADAPTA EL ENDPOINT A TU BACKEND
    this.api.get<any>('/products', {
      page: this.page,
      q: this.q,
      category: this.category,
      sort: this.sort
    }).subscribe({
      next: res => {
        const list = res.data || res;

        if (list.length < 10) this.hasMore = false;

        this.products.push(...list);
        this.loading = false;

        if (event) event.target.complete();
      },
      error: err => {
        console.error(err);
        this.loading = false;
        if (event) event.target.complete();
      }
    });
  }

  loadMore(event: any) {
    if (!this.hasMore) {
      event.target.disabled = true;
      return;
    }

    this.page++;
    this.loadProducts(event);
  }

  openProduct(p: any) {
    this.router.navigate(['/product', p.id]);
  }
}
