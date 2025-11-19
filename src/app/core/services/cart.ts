import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;              // productId
  titulo: string;
  image: string;
  precio: number;

  cantidad: number;

  companyId: number;       // ✔ Empresa dueña del producto
  vendorId: number | null; // ✔ Vendedor (si compra desde tienda de un vendedor)
  vendorProductId?: number | null;

  talla?: string | null;
  color?: string | null;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private key = 'mycart';
  private cart: CartItem[] = [];

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem(this.key, JSON.stringify(this.cart));
  }

  private load() {
    const data = localStorage.getItem(this.key);
    this.cart = data ? JSON.parse(data) : [];
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  clear() {
    this.cart = [];
    this.save();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  }

  /**
   * Agregar producto al carrito
   */
  add(item: CartItem) {

    // Buscar si ya existe el mismo producto con mismas variantes
    const exists = this.cart.find(ci =>
      ci.id === item.id &&
      ci.talla === item.talla &&
      ci.color === item.color &&
      ci.vendorId === item.vendorId &&
      ci.companyId === item.companyId
    );

    if (exists) {
      exists.cantidad += item.cantidad;
    } else {
      this.cart.push(item);
    }

    this.save();
  }

  /**
   * Actualizar cantidad
   */
  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find(i => i.id === productId);
    if (item) {
      item.cantidad = quantity;
      if (item.cantidad <= 0) this.remove(productId);
      this.save();
    }
  }

  /**
   * Eliminar un producto del carrito
   */
  remove(productId: number) {
    this.cart = this.cart.filter(i => i.id !== productId);
    this.save();
  }

    /**
   * Agregar producto usando estructura limpia desde Company o VendorProduct
   * product  → objeto del producto (Product)
   * company  → objeto de Company dueño del producto
   * vendor   → objeto VendorProfile si la compra es desde tienda del vendedor
   */
  addFromCompany(product: any, company: any, vendor: any = null, options: any = {}) {

    const item: CartItem = {
      id: product.id,
      titulo: product.titulo,
      image: product.portada || product.image || '',
      precio: product.precioOferta > 0 ? product.precioOferta : product.precioBase,

      cantidad: options.cantidad || 1,

      companyId: company.id,
      vendorId: vendor?.id || null,
      vendorProductId: product.vendorProductId || null,

      talla: options.talla || null,
      color: options.color || null,
    };

    this.add(item);
  }
  
}
