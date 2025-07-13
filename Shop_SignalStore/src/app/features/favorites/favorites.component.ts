import {Component, inject} from '@angular/core';
import {FavoritesStore} from './favorites-store/favorites.store';
import {FavoritesProductListComponent} from './favorites-product-list/favorites-product-list.component';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-favorites',
  imports: [
    FavoritesProductListComponent,
    RouterLink
  ],
  templateUrl: './favorites.component.html',
  standalone: true,
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  protected readonly favouriteStore = inject(FavoritesStore);

  clearFavorites() {
    this.favouriteStore.clearFavorites();
  }

}
