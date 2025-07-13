import {Component, inject, Input, signal} from '@angular/core';
import {CardComponent} from '../../../shared/ui/card/card.component';
import {Heart, LucideAngularModule, Plus, ShoppingBag} from 'lucide-angular';
import {ImageLoaderComponent} from '../../../shared/ui/image-loader/image-loader.component';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {FavoriteItem} from '../../../shared/models/favourite-item.model';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {RatingComponent} from '../../../shared/ui/rating/rating.component';
import {RouterLink} from '@angular/router';
import {FavoritesStore} from '../favorites-store/favorites.store';
import {CartStore} from '../../cart/store/cart.store';

@Component({
  selector: 'app-favorites-product',
  imports: [
    CardComponent,
    LucideAngularModule,
    ImageLoaderComponent,
    CurrencyPipe,
    FaIconComponent,
    RatingComponent,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './favorites-product.component.html',
  standalone: true,
  styleUrl: './favorites-product.component.scss'
})
export class FavoritesProductComponent {

  protected readonly favouriteStore = inject(FavoritesStore);
  protected readonly cartStore = inject(CartStore);

  protected readonly Heart = Heart;
  protected readonly ShoppingBag = ShoppingBag;
  protected readonly Plus = Plus;

  // Toast control signals
  showToast = signal(false);
  toastType = signal<'cart'|'favorite'>('cart'); // Tracks which toast to show

  @Input() data: FavoriteItem | null = null;



  removeFromFavorites(id: number) {
    this.favouriteStore.removeFromFavorites(id);
    this.showDynamicToast('favorite', 'Removed from favorites');
  }

  addToCart(item: FavoriteItem) {
    this.cartStore.addItem(item);
    this.showDynamicToast('cart', 'Added to cart');
  }

  private showDynamicToast(type: 'cart'|'favorite', message: string) {
    this.toastType.set(type);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }



}
