import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonButton
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth';
import { CartService, CartItem } from 'src/app/core/services/cart';
import { OrderService } from 'src/app/core/services/order';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
    IonButton, FormsModule, NgFor
  ],
})
export class CheckoutPage {

  nombre = '';
  telefono = '';
  direccion = '';
  ciudad = '';

  paymentType: 'online' | 'cod' = 'cod';
  loading = false;

  items: CartItem[] = [];

  constructor(
    private cart: CartService,
    private orderService: OrderService,
    private auth: AuthService,
    private router: Router
  ) {
    this.items = this.cart.getCart();
  }

  total() {
    return this.cart.getTotal();
  }

  submitOrder() {
    if (!this.nombre || !this.telefono || !this.direccion || !this.ciudad) {
      alert('Completa todos los datos de envío');
      return;
    }

    if (this.items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    this.loading = true;

    const shipping = {
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion,
      ciudad: this.ciudad
    };

    // ENVÍO CORRECTO:
    // → NO agrupamos por empresa aquí
    // → Cada item ya tiene su companyId y vendorId propio
    const payload = {
      paymentType: this.paymentType,
      shipping,
      items: this.items.map(i => ({
        productId: i.id,
        companyId: i.companyId,           // ✔ IMPORTANTE
        vendorId: i.vendorId,             // ✔ IMPORTANTE
        quantity: i.cantidad,
        talla: i.talla || null,
        color: i.color || null
      }))
    };

    this.orderService.createOrder(payload).subscribe({
      next: (orders: any[]) => {
        this.loading = false;
        this.cart.clear();

        alert(`Se generaron ${orders.length} órdenes correctamente`);
        this.router.navigate(['/orders']);
      },
      error: (err:any) => {
        this.loading = false;
        console.error(err);
        alert(err.error?.message || 'Error creando la orden');
      }
    });
  }
}
