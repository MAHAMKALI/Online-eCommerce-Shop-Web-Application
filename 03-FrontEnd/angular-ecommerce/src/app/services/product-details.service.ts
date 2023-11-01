import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private baseUrl = 'http://localhost:8080/api/products'; 
  
  constructor(private httpClient: HttpClient) { }

  getProductDetails(theProductId: number): Observable<Product>{
    const productURL = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productURL);
  }
}
