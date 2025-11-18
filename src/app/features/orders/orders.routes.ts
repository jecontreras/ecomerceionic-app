import { Routes } from '@angular/router';

export const ordersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./orders/orders.page').then(m => m.OrdersPage)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./order-detail/order-detail.page').then(m => m.OrderDetailPage)
  }
];
