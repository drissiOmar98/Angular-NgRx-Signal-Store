import {FavoriteItem} from '../../../shared/models/favourite-item.model';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed} from '@angular/core';
import {withStorageSync} from '../../../core/store/utils/with-storage-sync';


export interface FavoritesState {
  items:  FavoriteItem[];
}

const initialFavoritesState: FavoritesState = {
  items: [],
};


export const FavoritesStore = signalStore(
  { providedIn: 'root' },
  withState(initialFavoritesState),
  withStorageSync({ key: 'favorites', syncKeys: ['items'] }),
  withComputed((store) => ({
    count: computed(() => store.items().length),
    isFavorite: computed(() => {
      return (productId: number) => store.items().some(item => item.id === productId);
    })
  })),
  withMethods((store) => ({
    addToFavorites(product: FavoriteItem) {
      const exists = store.items().some(item => item.id === product.id);
      if (!exists) {
        patchState(store, { items: [...store.items(), product] });
      }
    },
    removeFromFavorites(id: number) {
      patchState(store, {
        items: store.items().filter(item => item.id !== id)
      });
    },
    clearFavorites() {
      patchState(store, { items: [] });
    },

  })),
  withHooks({
    onInit(store) {
      console.log('FavoritesStore initialized');
    },
    onDestroy(store) {
      console.log('FavoritesStore destroyed');
    }
  })
);
