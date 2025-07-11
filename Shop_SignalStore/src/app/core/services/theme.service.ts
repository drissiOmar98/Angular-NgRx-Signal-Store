import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlatformDetectionService } from './platform-detection.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private storageKey = 'app-theme';
    private darkThemeClass = 'dark-theme';

    private isDarkThemeSubject = new BehaviorSubject<boolean>(false);

    isDarkTheme$ = this.isDarkThemeSubject.asObservable();

    constructor(
        private _pds: PlatformDetectionService
    ) {
        if (this._pds.isRunningInBrowser()) {
            const initialTheme = this.getInitialThemeState();
            this.isDarkThemeSubject.next(initialTheme);
            this.applyTheme(initialTheme);
        }
    }

    toggleTheme(): void {
        const newState = !this.isDarkThemeSubject.value;
        this.isDarkThemeSubject.next(newState);
        this.applyTheme(newState);

        localStorage.setItem(this.storageKey, JSON.stringify(newState));
    }

    private getInitialThemeState(): boolean {

        const savedTheme = localStorage.getItem(this.storageKey);
        if (savedTheme) {
            try {
                return JSON.parse(savedTheme);
            } catch (e) {
                return false;
            }
        }

        return window.matchMedia('(prefers-color-scheme: light)').matches;
    }

    private applyTheme(isDark: boolean): void {
        if (isDark) {
            document.documentElement.classList.add(this.darkThemeClass);
        } else {
            document.documentElement.classList.remove(this.darkThemeClass);
        }
    }

    isDarkThemeValue(): boolean {
        return this.isDarkThemeSubject.value;
    }
}