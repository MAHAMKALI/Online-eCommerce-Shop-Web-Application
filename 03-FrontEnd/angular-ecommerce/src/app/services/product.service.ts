import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products'; 
  
  constructor(private httpClient: HttpClient) { }

  getProductListPagination(thePageNumber: number,thePageSize: number,theCategoryId : number | undefined): Observable<GetResponse> { 
    //const url = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    + `&page=${thePageNumber}&size=${thePageSize}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  } 
  
}

interface GetResponse { 
  _embedded: { 
    products: Product[]; 
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  } 
} 