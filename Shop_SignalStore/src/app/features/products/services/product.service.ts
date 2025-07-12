import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor() { }

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
