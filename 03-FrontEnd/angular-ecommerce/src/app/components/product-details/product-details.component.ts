import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { ProductDetailsService } from 'src/app/services/product-details.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: Product | undefined ;
  
  constructor(private productDetailsService: ProductDetailsService,
    private route: ActivatedRoute,
    private cartService: CartServiceService){}

  ngOnInit(){ 
    this.productDetails();
  }
  productDetails(){
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productDetailsService.getProductDetails(theProductId).subscribe(
      data => {
        this.product = data;
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
