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
import { CartService } from 'src/app/core/services/cart';
import { OrderService } from 'src/app/core/services/order';

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

  paymentType: 'online' | 'contraentrega' = 'contraentrega';

  loading = false;

  items:any = [];

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

    const user = this.auth.getCurrentUser();

    const payload = {
      companyId: 1, // ⚠️ Puedes reemplazar por la empresa del producto
      vendorId: null, // o vendor si es una tienda
      paymentType: this.paymentType,
      items: this.items.map((i:any) => ({
        productId: i.id,
        cantidad: i.cantidad,
        talla: i.talla || null,
        color: i.color || null
      })),
      shipping: {
        nombre: this.nombre,
        telefono: this.telefono,
        direccion: this.direccion,
        ciudad: this.ciudad
      }
    };

    this.orderService.createOrder(payload).subscribe({
      next: order => {
        this.loading = false;
        this.cart.clear();
        alert('Orden creada con éxito');
        this.router.navigate(['/orders']);
      },
      error: err => {
        this.loading = false;
        alert(err.error?.message || 'Error creando orden');
      }
    });
  }
}
