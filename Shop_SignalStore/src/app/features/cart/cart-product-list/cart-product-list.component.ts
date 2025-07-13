import {Component, Input} from '@angular/core';
import {CartItem} from '../../../shared/models/cart-item.model';
import {CartProductComponent} from '../cart-product/cart-product.component';

@Component({
  selector: 'app-cart-product-list',
  imports: [
    CartProductComponent
  ],
  templateUrl: './cart-product-list.component.html',
  standalone: true,
  styleUrl: './cart-product-list.component.scss'
})
export class CartProductListComponent {
  @Input() data: CartItem[] | [] = [];

}
