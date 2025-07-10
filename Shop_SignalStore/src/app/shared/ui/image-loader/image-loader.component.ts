import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-image-loader',
  imports: [],
  templateUrl: './image-loader.component.html',
  standalone: true,
  styleUrl: './image-loader.component.scss'
})
export class ImageLoaderComponent {

  @Input() src!: string;
  @Input() alt: string = '';
  isLoading: boolean = true;
  hasError: boolean = false;

  onLoad(): void {
    this.isLoading = false;
    this.hasError = false;
  }

  onError(): void {
    this.isLoading = false;
    this.hasError = true;
  }

}
