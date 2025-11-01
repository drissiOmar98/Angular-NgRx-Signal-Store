import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ImageSliderComponent} from '../../shared/components/image-slider/image-slider.component';
import {Slide} from '../../shared/models/slide';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ImageSliderComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  slides: Slide[] = [
    { url: 'assets/images/slide1.jpg', title: 'Explore our new collection' },
    { url: 'assets/images/slide2.jpg', title: 'Best deals of the season' },
    { url: 'assets/images/slide3.jpg', title: 'Find your perfect style' },
    { url: 'assets/images/slide4.jpg', title: 'Find your perfect style' },
    { url: 'assets/images/slide5.jpg', title: 'Find your perfect style' }
  ];




}
