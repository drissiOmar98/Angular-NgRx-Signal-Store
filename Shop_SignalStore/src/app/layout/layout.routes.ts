import { Routes } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { LayoutComponent } from "./layout.component";


export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { animation: 'HomePage' },
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { animation: 'HomePage' }
      },
      {
        path: 'products',
        loadComponent: () => import('../features/products/products.component')
          .then(m => m.ProductsComponent),
        data: { animation: 'ProductsPage' }
      },
      {
        path: 'products/:id',
        loadComponent: () => import('../features/products/product-details/product-details.component')
          .then(m => m.ProductDetailsComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('../features/cart/cart.component')
          .then(m => m.CartComponent),
        data: { animation: 'cartPage' }
      },
      {
        path: 'favorites',
        loadComponent: () => import('../features/favorites/favorites.component')
          .then(m => m.FavoritesComponent),
        data: { animation: 'favoritesPage' }
      },
      {
        path: 'payment/success',
        loadComponent: () => import('../features/payment/success/success.component')
          .then(m => m.SuccessComponent),
        data: { animation: 'SuccessPage' }
      },
      {
        path: 'payment/cancel',
        loadComponent: () => import('../features/payment/cancel/cancel.component')
          .then(m => m.CancelComponent),
        data: { animation: 'CancelPage' }
      }
    ]
  }
];
