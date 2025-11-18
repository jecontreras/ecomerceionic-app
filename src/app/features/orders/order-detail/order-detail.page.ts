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
  IonBadge,
  IonBackButton,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

import { NgIf, NgFor, CurrencyPipe, DatePipe, CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderService } from 'src/app/core/services/order';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonBadge,
    IonBackButton,
    IonButtons,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    DatePipe,
    NgIf,
    NgFor,
    CurrencyPipe,
    DatePipe,
  ],
})
export class OrderDetailPage implements OnInit {
  order?: Order;
  loading = false;

  statusOptions = [
    { value: 'nuevo', label: 'Nuevo' },
    { value: 'preparacion', label: 'En preparación' },
    { value: 'transito', label: 'En tránsito' },
    { value: 'entregado', label: 'Entregado' },
    { value: 'devuelto', label: 'Devuelto' },
  ];

  selectedStatus = '';
  trackingNumber = '';
  carrier = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.load(id);
  }

  load(id: number) {
    this.loading = true;

    this.orderService.getOrderDetail(id).subscribe({
      next: (res) => {
        this.order = res;
        this.loading = false;

        this.selectedStatus = res.estado;
        this.trackingNumber = res.trackingNumber || '';
        this.carrier = res.carrier || '';
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  updateStatus() {
    if (!this.order) return;

    this.orderService
      .changeStatus(
        this.order.id,
        this.selectedStatus,
        this.trackingNumber || undefined,
        this.carrier || undefined
      )
      .subscribe({
        next: (updated: any) => {
          // si el backend devuelve la orden actualizada
          this.order = {
            ...this.order!,
            estado: this.selectedStatus,
            trackingNumber: this.trackingNumber,
            carrier: this.carrier,
            statusHistory: updated.statusHistory || this.order?.statusHistory,
          };
          alert('Estado actualizado');
        },
        error: (err) => {
          console.error(err);
          alert('Error actualizando estado');
        },
      });
  }

  openChat() {
    if (!this.order) return;
    // puedes pasar el orderId como queryParam para que el chat sepa
    this.router.navigate(['/chat'], {
      queryParams: { orderId: this.order.id },
    });
  }
}
