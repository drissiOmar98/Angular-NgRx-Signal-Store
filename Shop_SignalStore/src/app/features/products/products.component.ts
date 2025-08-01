import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Product} from '../../shared/models/product.model';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductsSkeletonComponent} from '../../shared/ui/products-skeleton/products-skeleton.component';
import {Subject} from 'rxjs';
import {ProductStore} from './product-store/product.store';
import {Heart, LucideAngularModule, ShoppingBag} from 'lucide-angular';
import {CartStore} from '../cart/store/cart.store';
import {FavoritesStore} from '../favorites/favorites-store/favorites.store';

@Component({
  selector: 'app-products',
  imports: [
    RouterLink,
    ProductListComponent,
    ProductsSkeletonComponent,
    LucideAngularModule
  ],
  templateUrl: './products.component.html',
  standalone: true,
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnDestroy{
  // Stores
  productStore = inject(ProductStore);
  cartStore = inject(CartStore);
  favoriteStore= inject(FavoritesStore);

  // Icons
  readonly ShoppingBag = ShoppingBag;
  protected readonly Heart = Heart;

  favoriteToastMessage = signal<string>('');
  cartToastMessage = signal<string>('');
  cartToastShow = signal<boolean>(false);
  favoriteToastShow = signal<boolean>(false);
  timer: ReturnType<typeof setTimeout> | null = null
  private destroy$ = new Subject<void>();


  toggleFavorite(product: Product) {
    if (this.favoriteStore.isFavorite()(product.id)) {
      this.favoriteStore.removeFromFavorites(product.id);
      this.favoriteToastMessage.set('Successfully removed from Favorites');
    } else {
      this.favoriteStore.addToFavorites(product);
      this.favoriteToastMessage.set('Successfully added to Favorites');
    }
    this.favoriteToastShow.set(true);
    setTimeout(() => this.favoriteToastShow.set(false), 3000);
  }

  isFavorite = (productId: number): boolean => {
    return this.favoriteStore.isFavorite()(productId);
  };

  toggleInCart(product: Product) {
    if (this.isInCart(product.id)) {
      this.cartStore.remove(product.id);
      this.cartToastMessage.set(`Removed ${product.title} from cart`);
    } else {
      this.cartStore.addItem(product);
      this.cartToastMessage.set(`Added ${product.title} to cart`);
    }
    this.cartToastShow.set(true);
    setTimeout(() => this.cartToastShow.set(false), 3000);
  }


  isInCart = (productId: number): boolean => {
    return this.cartStore.isInCart()(productId);
  };


  ngAfterViewInit() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.cartToastShow.set(false);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }


}
