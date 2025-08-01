import {AfterContentInit, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { routeAnimations } from './widgets/animations/route.animation';
import { PlatformDetectionService } from './core/services/platform-detection.service';
import {fontAwesomeIcons} from './shared/font-awesome-icons';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeAnimations],
  standalone: true
})
export class AppComponent implements AfterContentInit ,OnInit{
  animationState: string = '';

  private faIconLibrary = inject(FaIconLibrary);


  constructor(
    private _platformDetectionService: PlatformDetectionService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initFontAwesome();
  }


  ngAfterContentInit() {
    if (this._platformDetectionService.isRunningInBrowser()) {
      Promise.resolve().then(() => {
        this.prepareRoute();
        this._cdr.detectChanges();
      });
    }
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

  prepareRoute(outlet?: RouterOutlet) {
    const newState = outlet?.activatedRouteData?.['animation'] ?? '';
    if (this.animationState !== newState) {
      this.animationState = newState;
      this._cdr.detectChanges();
    }
    return this.animationState;
  }
}
