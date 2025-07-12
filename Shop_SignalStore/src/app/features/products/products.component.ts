import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Product} from '../../shared/models/product.model';


import {ProductService} from './services/product.service';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductsSkeletonComponent} from '../../shared/ui/products-skeleton/products-skeleton.component';

import {Subject, take, takeUntil} from 'rxjs';
import {AsyncPipe} from '@angular/common';
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
export class ProductsComponent implements OnInit,OnDestroy{
  // Stores
  productStore = inject(ProductStore);
  cartStore = inject(CartStore);
  favoriteStore= inject(FavoritesStore);

  // Icons
  readonly ShoppingBag = ShoppingBag;
  protected readonly Heart = Heart;




  favoriteToastMessage = signal<string>('');
  cartToastShow = signal<boolean>(false);
  favoriteToastShow = signal<boolean>(false);
  timer: ReturnType<typeof setTimeout> | null = null
  private destroy$ = new Subject<void>();


  constructor() {
    // Cart toast effect - improved version
    effect((onCleanup) => {
      const currentQuantity = this.cartStore.totalQuantities();

      // Clear any existing timer
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      // Only show if there are items
      if (currentQuantity > 0) {
        this.cartToastShow.set(true);

        // Hide after 5 seconds
        this.timer = setTimeout(() => {
          this.cartToastShow.set(false);
        }, 5000);

        // Cleanup
        onCleanup(() => {
          if (this.timer) clearTimeout(this.timer);
        });
      }
    });
  }

  ngOnInit() {

  }

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
