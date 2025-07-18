import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {State} from '../../../shared/models/state.model';
import {CartItem} from '../../../shared/models/cart-item.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  http = inject(HttpClient);

  // State signals for payment processing
  private checkoutSession$ = signal(State.Builder<{ url: string }>().forInit());
  private isLoading$ = signal(false);

  // Computed signals for public access
  checkoutSessionSig = computed(() => this.checkoutSession$());
  isLoadingSig = computed(() => this.isLoading$())


  createCheckoutSession(items: CartItem[]): void {
    this.isLoading$.set(true);
    this.http.post<{ url: string }>(
      `${environment.API_URL}/payment/create-checkout-session`,
      {
        items: items.map(item => ({
          name: item.title,
          description: item.description,
          images: [item.image],
          price: item.price,
          quantity: item.quantity
        }))
      }
    ).subscribe({
      next: (session) => {
        this.checkoutSession$.set(State.Builder<{ url: string }>().forSuccess(session));
        this.isLoading$.set(false);
        window.location.href = session.url;
      },
      error: (err) => {
        this.checkoutSession$.set(State.Builder<{ url: string }>().forError(err));
        this.isLoading$.set(false);
      }
    });
  }

  resetCheckoutState(): void {
    this.checkoutSession$.set(State.Builder<{ url: string }>().forInit());
  }


  constructor() { }
}
