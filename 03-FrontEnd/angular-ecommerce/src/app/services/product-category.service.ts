import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../common/product-category';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductCategories(): Observable<ProductCategory[]> { 
    return this.httpClient.get<GetProductCategoryResponse>(this.baseUrl).pipe( 
      map(response => response._embedded.productCategory) 
    ); 
  } 
}


interface GetProductCategoryResponse { 
  _embedded: { 
    productCategory: ProductCategory[]; 
  } 
} 