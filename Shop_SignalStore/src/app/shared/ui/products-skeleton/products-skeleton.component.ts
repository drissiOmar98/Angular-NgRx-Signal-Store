import {Component, Input} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {RangePipe} from '../../pipes/range.pipe';

@Component({
  selector: 'app-products-skeleton',
  imports: [
    CardComponent,
    RangePipe
  ],
  templateUrl: './products-skeleton.component.html',
  standalone: true,
  styleUrl: './products-skeleton.component.scss'
})
export class ProductsSkeletonComponent {
  @Input() length: number = 5;
}
