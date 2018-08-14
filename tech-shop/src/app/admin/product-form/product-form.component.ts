import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import { ProductsService } from './../../products.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

	categories$;

  constructor(
  	catergoryService: CategoryService,
  	private productsService: ProductsService){ 
  		this.categories$ = catergoryService.getCategories();
  	}

  ngOnInit() {
  }
  // send new products to products service
  save(product){
  	this.productsService.create(product);

  }
}
