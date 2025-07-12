import { patchState, signalStoreFeature, withHooks } from '@ngrx/signals';
import { effect, inject } from '@angular/core';
import { PlatformDetectionService } from '../../services/platform-detection.service';

export function withStorageSync(options: { key: string; syncKeys: (keyof any)[] }) {
  return signalStoreFeature(
    withHooks({
      onInit(store) {
        const platformService = inject(PlatformDetectionService);

        // Load from localStorage only in browser
        if (platformService.isRunningInBrowser()) {
          const storedValue = localStorage.getItem(options.key);
          if (storedValue) {
            try {
              const parsed = JSON.parse(storedValue);
              const stateToPatch: Record<string, any> = {};

              options.syncKeys.forEach(key => {
                if (parsed[key as string] !== undefined) {
                  stateToPatch[key as string] = parsed[key as string];
                }
              });

              patchState(store, stateToPatch);
            } catch (e) {
              console.error('Failed to parse stored data', e);
            }
          }
        }

        // Save to localStorage on changes (only in browser)
        effect(() => {
          if (platformService.isRunningInBrowser()) {
            const stateToSave: Record<string, any> = {};
            options.syncKeys.forEach(key => {
              const value = (store as any)[key]?.();
              if (value !== undefined) {
                stateToSave[key as string] = value;
              }
            });

            localStorage.setItem(options.key, JSON.stringify(stateToSave));
          }
        });
      }
    })
  );
}
