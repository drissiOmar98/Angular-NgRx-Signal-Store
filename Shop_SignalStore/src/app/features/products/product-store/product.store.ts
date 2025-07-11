import {Product} from '../../../shared/models/product.model';
import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {ProductService} from '../services/product.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';
import { tapResponse } from '@ngrx/operators';


type ProductState = {
  products: Product[];
  error: string | null;
  loading: boolean;
};

const initialState: ProductState = {
  products: [],
  error: null,
  loading: false
};

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, productService = inject(ProductService)) => ({
    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          productService.getProducts().pipe(
            tapResponse({
              next: (products) =>
                patchState(store, { products, loading: false }),
              error: (err) => {
                console.error('Error loading products:', err);
                patchState(store, {
                  error:
                    err instanceof Error
                      ? err.message
                      : 'Failed to load products',
                  loading: false,
                });
              },
            })
          )
        )
      )
    ),
    getProductById: (id: number) => store.products().find((p) => p.id === id),
    clearError: () => patchState(store, { error: null }),
  })),


  withHooks((store) => ({
    onInit: () => {
      console.log('ProductStore initialized, loading products...');
      store.loadProducts();
    },
    onDestroy: () => {
      console.log('ProductStore destroyed.');
    },
  }))
);


