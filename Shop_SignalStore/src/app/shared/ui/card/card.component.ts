import {Component, Input} from '@angular/core';

@Component({
  selector: 'ui-card',
  imports: [],
  templateUrl: './card.component.html',
  standalone: true,
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() variant: 'grid' | 'list' | 'cart' = 'grid';

}
