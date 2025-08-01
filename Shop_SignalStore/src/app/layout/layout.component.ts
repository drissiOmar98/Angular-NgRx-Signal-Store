import { AfterContentInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlatformDetectionService } from '../core/services/platform-detection.service';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { routeAnimations } from '../widgets/animations/route.animation';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [routeAnimations],
  standalone: true
})
export class LayoutComponent implements AfterContentInit {
  animationState: string = '';

  constructor(
    private _platformDetectionService: PlatformDetectionService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngAfterContentInit() {
    if (this._platformDetectionService.isRunningInBrowser()) {
      Promise.resolve().then(() => {
        this.prepareRoute();
        this._cdr.detectChanges();
      });
    }
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
