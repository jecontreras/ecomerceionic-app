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
  IonSelect,
  IonSelectOption,
  IonInput
} from '@ionic/angular/standalone';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api';
import { CartService } from 'src/app/core/services/cart';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    IonSelect,
    IonSelectOption,
    IonInput,
    NgIf,
    NgFor,
    FormsModule
  ],
})
export class ProductPage implements OnInit {
  product: any = null;
  related: any[] = [];
  loading = true;

  // Selecciones del usuario
  selectedTalla: string | null = null;
  selectedColor: string | null = null;
  cantidad: number = 1;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cart: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.api.get<any>(`/products/${id}`).subscribe({
      next: res => {
        this.product = res.product || res;

        // relacionados
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

    if (p.tallas?.length && !this.selectedTalla) {
      alert('Selecciona una talla');
      return;
    }

    if (p.colores?.length && !this.selectedColor) {
      alert('Selecciona un color');
      return;
    }

    // Empresa y vendedor real
    const company = p.company || p.companyId || p.idEmpresa;
    const vendor = p.vendor || p.vendorId || null;

    this.cart.addFromCompany(
      p,                     // producto completo
      company,               // empresa dueña
      vendor,                // vendedor si aplica
      {
        talla: this.selectedTalla,
        color: this.selectedColor,
        cantidad: this.cantidad
      }
    );

    alert('Producto agregado al carrito');
  }
}
