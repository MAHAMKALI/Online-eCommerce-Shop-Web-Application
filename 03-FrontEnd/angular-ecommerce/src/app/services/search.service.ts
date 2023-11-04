import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl =  environment.luv2shopApiUrl + '/products'; 

  constructor(private httpClient: HttpClient) { }

  searchProducts(theKeyword: string): Observable<Product[]> { 
    // need to build URL based on the keyword  
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`; 
    return this.httpClient.get<GetResponseProducts>(searchUrl) .pipe( 
    map(response => response._embedded.products)); 
  }
}
interface GetResponseProducts { 
  _embedded: { 
    products: Product[]; 
  } 
}