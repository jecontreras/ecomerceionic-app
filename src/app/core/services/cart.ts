import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  titulo: string;
  image: string;
  precio: number;
  cantidad: number;
  talla?: string;
  color?: string;
  companyId?: string;
  vendorId?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private key = 'cart_items';

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem(this.key);
    if (saved) {
      this.cartSubject.next(JSON.parse(saved));
    }
  }

  private save() {
    localStorage.setItem(this.key, JSON.stringify(this.cartSubject.value));
  }

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }

  add(item: CartItem) {
    const cart = this.getCart();

    const exists = cart.find(
      p =>
        p.id === item.id &&
        p.talla === item.talla &&
        p.color === item.color
    );

    if (exists) {
      exists.cantidad += item.cantidad;
    } else {
      cart.push(item);
    }

    this.cartSubject.next([...cart]);
    this.save();
  }

  updateQuantity(item: CartItem, qty: number) {
    const cart = this.getCart();

    const index = cart.findIndex(
      p =>
        p.id === item.id &&
        p.talla === item.talla &&
        p.color === item.color
    );

    if (index >= 0) {
      cart[index].cantidad = qty;
    }

    this.cartSubject.next([...cart]);
    this.save();
  }

  remove(item: CartItem) {
    const cart = this.getCart().filter(
      p =>
        !(p.id === item.id &&
          p.talla === item.talla &&
          p.color === item.color)
    );

    this.cartSubject.next(cart);
    this.save();
  }

  clear() {
    this.cartSubject.next([]);
    this.save();
  }

  getTotal() {
    return this.getCart().reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
  }
  addToCart(product:any) {
  let cart = this.getCart();

  const existing = cart.find(i => i.id === product.id);

  if (existing) {
    existing.cantidad++;
  } else {
    cart.push({
      id: product.id,
      titulo: product.titulo,
      precio: product.precioVenta,
      image: product.image,
      cantidad: 1,

      vendorId: product.vendorId,          // 👈 IMPORTANTE
      companyId: product.companyId || null // 👈 SI APLICA
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}
}
