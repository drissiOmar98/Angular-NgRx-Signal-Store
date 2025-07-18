import {Component, effect, inject, OnDestroy, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {CartProductListComponent} from './cart-product-list/cart-product-list.component';
import {CartStore} from './store/cart.store';
import {PaymentService} from './services/payment.service';
import {LucideAngularModule, ShoppingBag} from 'lucide-angular';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
    RouterLinkActive,
    CurrencyPipe,
    CartProductListComponent,
    LucideAngularModule
  ],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnDestroy{

  paymentService = inject(PaymentService);
  protected readonly cartStore = inject(CartStore);

  // Toast signals
  paymentToastMessage = signal<string>('');
  paymentToastShow = signal<boolean>(false);
  private toastTimer: ReturnType<typeof setTimeout> | null = null;


  isLoading: boolean = false;

  constructor() {
    this.trackPaymentStatus();
  }
  resetCart() {
    this.cartStore.resetCart();
  }

  checkout() {
    this.paymentService.createCheckoutSession(this.cartStore.items());
  }

  private trackPaymentStatus() {
    effect(() => {
      const paymentState = this.paymentService.checkoutSessionSig();
      const isLoading = this.paymentService.isLoadingSig();

      // Clear any existing timer
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
        this.toastTimer = null;
      }

      if (isLoading) {
        this.paymentToastMessage.set('Processing your payment...');
        this.paymentToastShow.set(true);
      } else if (paymentState.status === "OK") {
        this.paymentToastMessage.set('Checkout session created successfully');
        this.paymentToastShow.set(true);
        this.toastTimer = setTimeout(() => this.paymentToastShow.set(false), 5000);
      } else if (paymentState.status === "ERROR") {
        this.paymentToastMessage.set('Payment failed: ' + (paymentState.error?.message || 'Please try again'));
        this.paymentToastShow.set(true);
        this.toastTimer = setTimeout(() => this.paymentToastShow.set(false), 5000);
      }
    });
  }

  ngOnDestroy() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.paymentService.resetCheckoutState();
  }

  protected readonly ShoppingBag = ShoppingBag;
}
