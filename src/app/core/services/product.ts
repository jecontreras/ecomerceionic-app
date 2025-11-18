// src/app/core/services/product.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api';

export interface Product {
  id: number;
  titulo: string;
  image: string;
  precioBase: number;
  precioOferta: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private api: ApiService) {}

  getPublicProducts(params?: any) {
    return this.api.get<Product[]>('/products', params);
  }
}
