import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';

export interface OrderItem {
  productId: number;
  titulo: string;
  image: string;
  cantidad: number;
  precioUnitario: number;
}

export interface OrderStatusHistory {
  id: number;
  status: string;
  note?: string;
  changedAt: string;
  changedByName?: string;
}

export interface Order {
  id: number;
  codigo: string;
  estado: string;
  total: number;
  fecha: string;
  items: OrderItem[];
  statusHistory?: OrderStatusHistory[];
  trackingNumber?: string;
  carrier?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private api: ApiService) {}

  // lista paginada, con filtro opcional
  getMyOrders(page = 1, limit = 10, status?: string): Observable<Order[]> {
    const params: any = { page, limit };
    if (status) params.status = status;
    return this.api.get<Order[]>('/orders/my', params);
  }

  getOrderDetail(id: number): Observable<Order> {
    return this.api.get<Order>(`/orders/${id}`);
  }

  // cambiar estado + tracking opcional
  changeStatus(
    id: number,
    status: string,
    trackingNumber?: string,
    carrier?: string
  ) {
    return this.api.put(`/orders/${id}/status`, {
      status,
      trackingNumber,
      carrier,
    });
  }
  createOrder(payload: any) {
    return this.api.post('/orders', payload);
  }
}
