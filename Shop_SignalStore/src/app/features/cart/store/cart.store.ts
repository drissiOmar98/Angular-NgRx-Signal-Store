import {CartItem} from '../../../shared/models/cart-item.model';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {withStorageSync} from '../../../core/store/utils/with-storage-sync';
import {computed} from '@angular/core';
import {Product} from '../../../shared/models/product.model';


export interface CartState {
  items: CartItem[];
  totalQuantities: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantities: 0,
  totalAmount: 0
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStorageSync({ key: 'cart', syncKeys: ['items', 'totalQuantities', 'totalAmount'] }),
  withComputed((store) => ({
    isCartEmpty: computed(() => store.items().length === 0),
    uniqueItemsCount: computed(() => store.items().length),
    // Additional computed properties can be added here
    hasItems: computed(() => store.items().length > 0),
    averageItemPrice: computed(() => {
      const items = store.items();
      if (items.length === 0) return 0;
      return store.totalAmount() / store.totalQuantities();
    })
  })),
  withMethods((store) => ({
    addItem(product: Product) {
      if (store.items().length <= 0) {
        patchState(store, {
          items: [{ ...product, quantity: 1 }],
          totalQuantities: 1,
          totalAmount: product.price
        });
        return;
      }

      const existingItem = store.items().find(item => item.id === product.id);

      if (!existingItem) {
        patchState(store, {
          items: [...store.items(), { ...product, quantity: 1 }],
          totalQuantities: store.totalQuantities() + 1,
          totalAmount: store.totalAmount() + product.price
        });
        return;
      }

      const updatedItems = store.items().map(item => {
        if (item.id !== existingItem.id) return item;
        return { ...existingItem, quantity: existingItem.quantity + 1 };
      });

      patchState(store, {
        items: updatedItems,
        totalQuantities: store.totalQuantities() + 1,
        totalAmount: store.totalAmount() + product.price
      });
    },

    removeItem(id: number) {
      const existingItem = store.items().find(item => item.id === id);
      if (!existingItem) return;

      const itemNewQuantity = existingItem.quantity - 1;
      let updatedItems: CartItem[];

      if (itemNewQuantity === 0) {
        updatedItems = store.items().filter(item => item.id !== id);
      } else {
        updatedItems = store.items().map(item => {
          if (item.id !== existingItem.id) return item;
          return { ...existingItem, quantity: itemNewQuantity };
        });
      }

      patchState(store, {
        items: updatedItems,
        totalQuantities: store.totalQuantities() - 1,
        totalAmount: store.totalAmount() - existingItem.price
      });
    },

    remove(id: number) {
      const existingItem = store.items().find(item => item.id === id);
      if (!existingItem) return;

      patchState(store, {
        items: store.items().filter(item => item.id !== id),
        totalQuantities: store.totalQuantities() - existingItem.quantity,
        totalAmount: store.totalAmount() - (existingItem.quantity * existingItem.price)
      });
    },

    resetCart() {
      patchState(store, {
        items: [],
        totalQuantities: 0,
        totalAmount: 0
      });
    }
  })),
  withHooks((store) => ({
    onInit: () => {
      console.log('CartStore initialized, loading cart...');

    },
    onDestroy: () => {
      console.log('CartStore destroyed.');
    },
  }))
);
