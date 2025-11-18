import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
  IonItem,
} from '@ionic/angular/standalone';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api';
import { NgIf, NgFor } from '@angular/common';
import { CartService } from 'src/app/core/services/cart';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonButton,
    IonLabel,
    IonItem,
    NgIf,
    NgFor
  ],
})
export class ProductPage implements OnInit {
  product: any = null;
  related: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cart: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    // ADAPTA TU ENDPOINT
    this.api.get<any>(`/products/${id}`).subscribe({
      next: res => {
        this.product = res.product || res;

        this.related = res.related || [];

        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }
  addToCart() {
  const p = this.product;

  this.cart.add({
    id: p.id,
    titulo: p.titulo || p.pro_nombre,
    image: p.image || p.foto,
    precio: p.precioVenta || p.pro_uni_venta,
    cantidad: 1,
    talla: p.tallaSeleccionada || null,
    color: p.colorSeleccionado || null,
  });

  alert('Producto agregado al carrito');
}
}
