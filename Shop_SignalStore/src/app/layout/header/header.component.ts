import { CommonModule } from '@angular/common';
import {Component, inject} from '@angular/core';

import {LucideAngularModule, ShoppingBag} from 'lucide-angular';
import {CartStore} from '../../features/cart/store/cart.store';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ThemeToggleComponent} from '../../shared/components/theme-toggle/theme-toggle.component';
import {FavoritesStore} from '../../features/favorites/favorites-store/favorites.store';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    ThemeToggleComponent
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  cartStore = inject(CartStore);
  favoriteStore= inject(FavoritesStore);


  protected readonly ShoppingBag = ShoppingBag;
}
