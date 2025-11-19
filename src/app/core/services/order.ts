// src/app/core/services/order.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  talla?: string;
  color?: string;
  product?: {
    id: number;
    titulo?: string;
    image?: string;
    precioVenta?: number;
  };
}

export interface OrderStatusHistory {
  id: number;
  status: string;
  note?: string;
  createdAt: string;
  changedBy?: number;
  changedByName?: string;
}

export interface ShippingInfo {
  nombre: string;
  telefono: string;
  direccion: string;
  ciudad: string;
}

export interface Order {
  id: number;
  code: string;
  status: string;
  total: number;
  createdAt: string;

  items: OrderItem[];
  statusHistory?: OrderStatusHistory[];

  shippingInfo?: ShippingInfo | null;
  trackingNumber?: string | null;
  carrier?: string | null;

  customer?: any;
  vendor?: any;
  company?: any;
  attachments?: any;
}

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private api: ApiService) {}

  // --------------------------
  // ORDENES DEL CLIENTE
  // --------------------------
  getMyOrders(page = 1, limit = 10, status?: string): Observable<Order[]> {
    const params: any = { page, limit };
    if (status) params.status = status;
    return this.api.get<Order[]>('/orders/my', params);
  }

  getOrderDetail(id: number): Observable<Order> {
    return this.api.get<Order>(`/orders/${id}`);
  }

  // --------------------------
  // CREAR ORDEN (CLIENTE)
  // --------------------------
  createOrder(payload: any): any {
    return this.api.post('/orders', payload);
  }

  // --------------------------
  // CAMBIAR ESTADO (EMPRESA / ADMIN)
  // --------------------------
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

  addNote(orderId: number, note: any) {
    return this.api.post(`/orders/${orderId}/add-note`, { note });
  }

  // --------------------------
  // ORDENES DEL VENDEDOR
  // --------------------------
  getVendorOrders(): Observable<Order[]> {
    return this.api.get<Order[]>('/orders/vendor');
  }

  // --------------------------
  // ORDENES DE LA EMPRESA
  // --------------------------
  getCompanyOrders(): Observable<Order[]> {
    return this.api.get<Order[]>('/orders/company');
  }

  uploadAttachment(orderId: number, data: FormData) {
    return this.api.post(`/orders/${orderId}/attachments`, data);
  }


}
