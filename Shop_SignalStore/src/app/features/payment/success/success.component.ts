import {Component, inject, OnInit} from '@angular/core';
import {ChevronRight, LucideAngularModule} from 'lucide-angular';
import {RouterLink} from '@angular/router';
import {CartStore} from '../../cart/store/cart.store';

@Component({
  selector: 'app-success',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './success.component.html',
  standalone: true,
  styleUrl: './success.component.scss'
})
export class SuccessComponent implements OnInit{

  cartStore = inject(CartStore);

  protected readonly ChevronRight = ChevronRight;

  constructor() { }

  ngOnInit() {
    this.cartStore.resetCart();
  }

}
