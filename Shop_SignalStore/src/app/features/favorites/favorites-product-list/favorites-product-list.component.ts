import {Component, Input} from '@angular/core';
import {FavoritesProductComponent} from '../favorites-product/favorites-product.component';
import {FavoriteItem} from '../../../shared/models/favourite-item.model';

@Component({
  selector: 'app-favorites-product-list',
  imports: [
    FavoritesProductComponent
  ],
  templateUrl: './favorites-product-list.component.html',
  standalone: true,
  styleUrl: './favorites-product-list.component.scss'
})
export class FavoritesProductListComponent {
  @Input() data: FavoriteItem[] | [] = [];


}
