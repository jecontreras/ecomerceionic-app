import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonLabel, IonBadge, IonButton
} from '@ionic/angular/standalone';
import { NgFor, DatePipe, NgIf } from '@angular/common';

import { OrderService, Order } from 'src/app/core/services/order';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.page.html',
  styleUrls: ['./vendor-orders.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonBadge, IonButton,
    NgFor, DatePipe, NgIf
  ]
})
export class VendorOrdersPage {

  orders: Order[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getVendorOrders().subscribe({
      next: res => {
        this.orders = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Error cargando órdenes');
      }
    });
  }

  openDetail(order: Order) {
    this.router.navigate(['/orders', order.id]);
  }
}
