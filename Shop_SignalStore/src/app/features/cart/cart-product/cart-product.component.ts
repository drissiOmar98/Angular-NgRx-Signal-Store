import {Component, inject, Input} from '@angular/core';
import {CartItem} from '../../../shared/models/cart-item.model';
import {ImageLoaderComponent} from '../../../shared/ui/image-loader/image-loader.component';
import {CardComponent} from '../../../shared/ui/card/card.component';
import {CurrencyPipe} from '@angular/common';
import {CartStore} from '../store/cart.store';
import {LucideAngularModule, Minus, Plus, Trash2} from 'lucide-angular';



@Component({
  selector: 'app-cart-product',
  imports: [ImageLoaderComponent, CardComponent, CurrencyPipe, LucideAngularModule],
  templateUrl: './cart-product.component.html',
  standalone: true,
  styleUrl: './cart-product.component.scss'
})
export class CartProductComponent {

  cartStore = inject(CartStore);

  @Input() data: CartItem | null = null;

  protected readonly Plus = Plus;
  protected readonly Minus = Minus;
  protected readonly Trash2 = Trash2;

  constructor() { }

  addToCart(item: CartItem) {
    this.cartStore.addItem(item);
  }

  removeCartItem(id: number) {
    this.cartStore.removeItem(id);
  }

  remove(id: number) {
    this.cartStore.remove(id);
  }


}
