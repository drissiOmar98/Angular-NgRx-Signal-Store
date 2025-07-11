import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class PlatformDetectionService {
    private isBrowser: boolean;
    private isServer: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.isServer = isPlatformServer(this.platformId);
    }

    isRunningInBrowser(): boolean {
        return this.isBrowser;
    }

    isRunningInServer(): boolean {
        return this.isServer;
    }
}
