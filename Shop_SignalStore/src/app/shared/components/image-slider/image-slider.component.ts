import {Component, computed, effect, Inject, input, PLATFORM_ID, signal, untracked} from '@angular/core';
import {Slide} from '../../models/slide';
import {isPlatformBrowser, NgStyle} from '@angular/common';


/**
 * ImageSliderComponent
 *
 * A fully functional, reactive image slider component built with Angular Signals.
 * It supports automatic sliding, manual navigation, and dynamic slide rendering.
 *
 * Features:
 *  - Display a list of images as slides
 *  - Navigate manually using left/right arrows
 *  - Navigate directly using dot indicators
 *  - Automatic slide rotation with configurable interval
 *  - Reactive updates using Angular Signals
 *  - Computed styles for dynamic slide positioning
 *  - Standalone component, can be used anywhere in Angular 18+ projects
 */
@Component({
  selector: 'app-image-slider',
  imports: [
    NgStyle
  ],
  templateUrl: './image-slider.component.html',
  standalone: true,
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent {

  /**
   * The array of slides to display in the slider.
   * Each slide should conform to the `Slide` interface (url + title).
   * Required input property.
   */
  slides= input.required<Slide[]>();

  /**
   * The width of each slide in pixels.
   * Required input property to compute slide container translation.
   */
  parentWidth= input.required<number>();

  /**
   * The index of the currently active slide.
   * Managed as a reactive signal for automatic updates in the template.
   */
  currentIndex = signal(0);

  /**
   * Computed signal for the style of the slides container.
   * Dynamically calculates width and transform (translateX) to show the correct slide.
   * Reactive: updates automatically when `currentIndex` or `slides` change.
   */
  slidesContainerStyle = computed(()=> ({
    width: `${this.parentWidth() * this.slides().length}px`,
    transform: `translateX(-${this.currentIndex() * this.parentWidth()}px)`
  }));

  /**
   * Stores the ID of the automatic slide timeout.
   * Used to clear the timeout before setting a new one.
   */
  timeoutId= signal<number | undefined>(undefined);

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Effect for automatic sliding.
   * Runs on `currentIndex` change, clears previous timeout, and schedules the next slide.
   * Slide interval is set to 2000ms (2 seconds) by default.
   */
  timeoutEffect= effect(() =>{
    if (!this.isBrowser) return; // ✅ Prevent window access on server
    const index = this.currentIndex();
    const prevId= untracked(()=> this.timeoutId());
    window.clearTimeout(prevId);
    const id= window.setTimeout(()=>{
      this.goToNext()
    },2000);
    untracked(()=>this.timeoutId.set(id));
  });

  /**
   * Generates dynamic style for a single slide.
   * Sets background image and width.
   *
   * @param slide The slide object containing `url` and `title`
   * @returns An object containing CSS styles for the slide
   */
  getSlideStyle = (slide: Slide) => ({
    backgroundImage: `url(${slide.url})`,
    width: `${this.parentWidth()}px`,
  });

  /**
   * Navigate to the previous slide.
   * Wraps around to the last slide if currently at the first slide.
   */
  goToPrevious(): void{
    const isFirst= this.currentIndex() === 0;
    const  newIndex= isFirst ? this.slides().length - 1 : this.currentIndex() - 1;
    this.currentIndex.set(newIndex);
  }

  /**
   * Navigate to the next slide.
   * Wraps around to the first slide if currently at the last slide.
   */
  goToNext():void{
    const isLast= this.currentIndex() === this.slides().length - 1;
    const newIndex= isLast ? 0 : this.currentIndex() + 1;
    this.currentIndex.set(newIndex);
  }

  /**
   * Navigate directly to a specific slide.
   *
   * @param index The index of the slide to navigate to
   */
  goToSlide(index: number) {
    this.currentIndex.set(index);
  }




}
