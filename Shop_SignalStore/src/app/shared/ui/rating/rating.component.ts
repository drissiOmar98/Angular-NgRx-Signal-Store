import {Component, Input} from '@angular/core';

import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-rating',
  imports: [
    FaIconComponent
  ],
  templateUrl: './rating.component.html',
  standalone: true,
  styleUrl: './rating.component.scss'
})
export class RatingComponent {

  @Input() rating: number = 0;
  maxRating: number = 5;

  get fullStars(): number {
    return Math.floor(this.rating);
  }

  get hasHalfStar(): boolean {
    return this.rating % 1 !== 0;
  }

  get emptyStars(): number {
    return this.maxRating - Math.ceil(this.rating);
  }

  createArray(length: number): any[] {
    return Array.from({ length });
  }

}
