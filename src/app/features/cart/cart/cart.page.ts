import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonButton,
  IonAvatar,
  IonIcon,
  IonInput
} from '@ionic/angular/standalone';

import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem, CartService } from 'src/app/core/services/cart';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonButton,
    IonAvatar,
    IonIcon,
    IonInput,
    NgFor,
    NgIf
  ]
})
export class CartPage {

  items: CartItem[] = [];

  constructor(private cart: CartService, private router: Router) {
    this.items = this.cart.getCart();
  }

  updateQty(item: CartItem, ev: any) {
    const val = Number(ev.target.value);
    if (val > 0) this.cart.updateQuantity(item, val);
  }

  remove(item: CartItem) {
    this.cart.remove(item);
    this.items = this.cart.getCart();
  }

  total() {
    return this.cart.getTotal();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
