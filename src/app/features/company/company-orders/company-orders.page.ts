import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonBadge
} from '@ionic/angular/standalone';

import { NgFor, DatePipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { OrderService, Order } from 'src/app/core/services/order';

@Component({
  standalone: true,
  selector: 'app-company-orders',
  templateUrl: './company-orders.page.html',
  styleUrls: ['./company-orders.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonBadge,
    NgFor, DatePipe, NgIf
  ]
})
export class CompanyOrdersPage {

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

    this.orderService.getCompanyOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        alert('No se pudieron cargar las órdenes de la empresa.');
      }
    });
  }

  openDetail(order: Order) {
    this.router.navigate(['/orders', order.id]);
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'nuevo': return 'warning';
      case 'preparacion': return 'tertiary';
      case 'transito': return 'medium';
      case 'entregado': return 'success';
      case 'devuelto': return 'danger';
      default: return 'light';
    }
  }
}
