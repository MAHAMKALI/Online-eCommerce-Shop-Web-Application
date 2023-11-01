import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
   products: Product[] = [];
   thePageNumber: number = 1;
   thePageSize: number = 5;
   theTotalElements: number = 0;
   currentCategoryId: number = 1;
   previousCategoryId: number = 1;
   searchMode: boolean = false;
   constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private searchService: SearchService,
              private cartService: CartServiceService){}

   ngOnInit(){
      this.route.paramMap.subscribe( () => {
        this.displayProducts();
      });
   }

   displayProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.searchProducts();
    }
    else {
      this.listProducts();
    }
   }
   listProducts(){
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
      if(hasCategoryId){
        const  idParam = this.route.snapshot.paramMap.get('id');
        if (idParam !== null && !isNaN(Number(idParam))) {
          // here converting id from string to number using + symbol
          this.currentCategoryId = +idParam;
        }
      }else{
        this.currentCategoryId = 1;
      }
      if (this.previousCategoryId != this.currentCategoryId) {
        this.thePageNumber = 1;
      }
  
      this.previousCategoryId = this.currentCategoryId;
  
      console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

      this.productService.getProductListPagination(this.thePageNumber - 1,this.thePageSize,this.currentCategoryId).subscribe(

        data => {
          this.products = data._embedded.products;
          this.thePageNumber = data.page.number + 1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
        }
    
      );
   }

   searchProducts(){
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

      // now search for the products using keyword
      this.searchService.searchProducts(theKeyword).subscribe(
        data => {
          this.products = data;
        }
      )
    }

    addToCart(theProduct: Product){
      console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

      // TODO ... do the real work
      const theCartItem = new CartItem(theProduct.id!, theProduct.name!, theProduct.imageUrl!, theProduct.unitPrice!);

      this.cartService.addToCart(theCartItem);
    }
}
