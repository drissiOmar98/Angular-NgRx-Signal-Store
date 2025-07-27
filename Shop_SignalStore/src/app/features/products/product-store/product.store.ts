import {Product} from '../../../shared/models/product.model';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {ProductService} from '../services/product.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {map, of, pipe, switchMap, tap} from 'rxjs';
import { tapResponse } from '@ngrx/operators';


type ProductState = {
  products: Product[];
  currentProduct: Product | null;
  error: string | null;
  loading: boolean;
};

const initialState: ProductState = {
  products: [],
  currentProduct: null,
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
    loadProductById: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) => {
          // First try to find in existing products
          const existingProduct = store.products().find(p => p.id === id);
          if (existingProduct) {
            return of(existingProduct);
          }
          // If not found, fetch from API (though fakestoreapi.com doesn't support single product)
          return productService.getProducts().pipe(
            map(products => products.find(p => p.id === id)))
        }),
        tapResponse({
          next: (product) => {
            if (product) {
              patchState(store, { currentProduct: product, loading: false });
            } else {
              patchState(store, {
                error: 'Product not found',
                loading: false
              });
            }
          },
          error: (err) => {
            console.error('Error loading product:', err);
            patchState(store, {
              error: err instanceof Error ? err.message : 'Failed to load product',
              loading: false,
            });
          },
        })
      )
    ),
    getProductById: (id: number) => store.products().find((p) => p.id === id),
    clearCurrentProduct: () => patchState(store, { currentProduct: null }),
    clearError: () => patchState(store, { error: null }),
  })),
  withComputed((store) => ({
    // Add this computed signal
    relatedProducts: computed(() => {
      const currentProduct = store.currentProduct();
      const products = store.products();

      if (!currentProduct || products.length === 0) {
        return [];
      }

      return products.filter(p =>
        p.category === currentProduct.category &&
        p.id !== currentProduct.id
      ).slice(0, 4); // Get max 4 related products
    })
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


