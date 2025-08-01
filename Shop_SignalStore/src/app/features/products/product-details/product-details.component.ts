import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductStore} from '../product-store/product.store';
import {CartStore} from '../../cart/store/cart.store';
import {FavoritesStore} from '../../favorites/favorites-store/favorites.store';
import {Product} from '../../../shared/models/product.model';
import {Heart, LucideAngularModule, ShoppingBag} from 'lucide-angular';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {RatingComponent} from '../../../shared/ui/rating/rating.component';
import {CardComponent} from '../../../shared/ui/card/card.component';
import {ImageLoaderComponent} from '../../../shared/ui/image-loader/image-loader.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ProductListComponent} from '../product-list/product-list.component';

@Component({
  selector: 'app-product-details',
  imports: [
    LucideAngularModule,
    CurrencyPipe,
    DecimalPipe,
    RatingComponent,
    CardComponent,
    ImageLoaderComponent,
    FaIconComponent,
    ProductListComponent
  ],
  templateUrl: './product-details.component.html',
  standalone: true,
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  // Stores
  productStore = inject(ProductStore);
  cartStore = inject(CartStore);
  favoriteStore= inject(FavoritesStore);

  private route = inject(ActivatedRoute);

  constructor() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productStore.loadProductById(id);
    });
  }

  addToCart(product: Product) {
    if (!product) return;
    this.cartStore.addItem(product);
  }

  toggleFavorite(product: Product) {
    if (this.isFavorite(product.id)) {
      this.favoriteStore.removeFromFavorites(product.id);
    } else {
      this.favoriteStore.addToFavorites(product);
    }
  }

  toggleInCart(product: Product) {
    if (this.isInCart(product.id)) {
      this.cartStore.remove(product.id);
    } else {
      this.cartStore.addItem(product);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteStore.isFavorite()(productId);
  }

  isInCart = (productId: number): boolean => {
    return this.cartStore.isInCart()(productId);
  };



  protected readonly ShoppingBag = ShoppingBag;
  protected readonly Heart = Heart;
}
