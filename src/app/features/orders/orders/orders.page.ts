import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonSegment,
  IonSegmentButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { NgIf, NgFor, DatePipe, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Order, OrderService } from 'src/app/core/services/order';

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonSegment,
    IonSegmentButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    NgIf,
    NgFor,
    DatePipe,
    CurrencyPipe,
  ],
})
export class OrdersPage implements OnInit {
  loading = false;
  orders: Order[] = [];
  page = 1;
  hasMore = true;
  selectedStatus: string = 'todos';

  statuses = [
    { value: 'todos', label: 'Todos' },
    { value: 'nuevo', label: 'Nuevo' },
    { value: 'preparacion', label: 'En preparación' },
    { value: 'transito', label: 'En tránsito' },
    { value: 'entregado', label: 'Entregado' },
    { value: 'devuelto', label: 'Devuelto' },
  ];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refresh();
  }

  private fetch(page: number, event?: any) {
    this.loading = page === 1;

    const statusParam =
      this.selectedStatus === 'todos' ? undefined : this.selectedStatus;

    this.orderService.getMyOrders(page, 10, statusParam).subscribe({
      next: (res) => {
        if (page === 1) this.orders = [];
        this.orders = [...this.orders, ...res];
        this.hasMore = res.length === 10; // si trae menos, ya no hay más
        this.loading = false;
        event?.target?.complete();
      },
      error: () => {
        this.loading = false;
        this.hasMore = false;
        event?.target?.complete();
      },
    });
  }

  refresh(event?: any) {
    this.page = 1;
    this.hasMore = true;
    this.fetch(this.page, event);
  }

  loadMore(event: any) {
    if (!this.hasMore) {
      event.target.disabled = true;
      event.target.complete();
      return;
    }
    this.page++;
    this.fetch(this.page, event);
  }

  onStatusChange(ev: CustomEvent) {
    this.selectedStatus = ev.detail.value;
    this.refresh();
  }

  goToDetail(orderId: number) {
    this.router.navigate(['/orders', orderId]);
  }

  trackById(_: number, item: Order) {
    return item.id;
  }
}
