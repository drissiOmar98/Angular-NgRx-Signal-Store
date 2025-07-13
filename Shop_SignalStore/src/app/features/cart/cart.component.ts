import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {CartProductListComponent} from './cart-product-list/cart-product-list.component';
import {CartStore} from './store/cart.store';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
    RouterLinkActive,
    CurrencyPipe,
    CartProductListComponent
  ],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  protected readonly cartStore = inject(CartStore);

  isLoading: boolean = false;

  constructor() {
  }

  resetCart() {
    this.cartStore.resetCart();
  }

  async checkout() {
    this.isLoading = true;
  }

}
