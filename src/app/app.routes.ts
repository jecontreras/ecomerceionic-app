import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
// si quieres que home sea la inicial:
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'register-role',
    loadComponent: () =>
      import('./features/auth/register-role/register-role.page').then(m => m.RegisterRolePage)
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'product-list',
    loadComponent: () => import('./features/catalog/product-list/product-list.page').then( m => m.ProductListPage)
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/customer/orders/orders.routes').then(m => m.ordersRoutes)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./features/notifications/notifications/notifications.page').then( m => m.NotificationsPage)
  },
  {
  path: 'chat',
  children: [
    {
      path: '',
      loadComponent: () =>
        import('./features/chat/chat-list/chat-list.page').then(m => m.ChatListPage)
    },
    {
      path: 'room/:id',
      loadComponent: () =>
        import('./features/chat/chat-room/chat-room.page').then(m => m.ChatRoomPage)
    }
  ]
},
  {
    path: 'catalog',
    loadComponent: () => import('./features/catalog/catalog/catalog.page').then( m => m.CatalogPage)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./features/catalog/product/product.page').then( m => m.ProductPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart/cart.page').then( m => m.CartPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout/checkout.page').then( m => m.CheckoutPage)
  },
  {
    path: 'vendor-ordes',
    loadComponent: () => import('./features/vendor/vendor-orders/vendor-orders.page').then( m => m.VendorOrdersPage)
  },
  {
    path: 'company-orders',
    loadComponent: () => import('./features/company/company-orders/company-orders.page').then( m => m.CompanyOrdersPage)
  }

];
