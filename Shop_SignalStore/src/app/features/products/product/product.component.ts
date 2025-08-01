import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ImageLoaderComponent} from '../../../shared/ui/image-loader/image-loader.component';
import {CardComponent} from '../../../shared/ui/card/card.component';
import {CurrencyPipe, DecimalPipe, NgIf} from '@angular/common';
import {Product} from '../../../shared/models/product.model';
import {RatingComponent} from '../../../shared/ui/rating/rating.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {CartStore} from '../../cart/store/cart.store';
import {LucideAngularModule, Plus} from 'lucide-angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [
    ImageLoaderComponent,
    CardComponent,
    CurrencyPipe,
    DecimalPipe,
    RatingComponent,
    FaIconComponent,
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input() data: Product | null = null;
  @Input() isFavorite!: boolean;
  @Input() isInCart!: boolean;
  @Output() toggleFavorite = new EventEmitter<Product>();
  @Output() toggleCart = new EventEmitter<Product>();

  constructor() { }

  onToggleFavorite() {
    if (this.data) {
      this.toggleFavorite.emit(this.data);
    }
  }
  onToggleCart() {
    if (this.data) {
      this.toggleCart.emit(this.data);
    }
  }


  protected readonly Plus = Plus;
}
