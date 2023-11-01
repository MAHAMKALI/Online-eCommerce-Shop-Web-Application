import { Component } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent {
  productCategories: ProductCategory[] = [];
  constructor(private productCategoryService: ProductCategoryService){}

  ngOnInit(){ 
    this.listProductCategories();
  }

  listProductCategories(){
    
    this.productCategoryService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    )
  }

}
