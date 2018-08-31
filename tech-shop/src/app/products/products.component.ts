import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	products: any;
	filteredProducts: Product[] = [];
	category: string;
	
  constructor( 
  	route: ActivatedRoute,
  	productsService: ProductsService , 
  	 ) { 
  		// Using switchMap operator to switch to new observable
	  	productsService
	  	.getAll()
	  	.switchMap( p => { 
	  		this.products = p;
	  		return route.queryParamMap;
	  	})
	  	// get the category from route param
	  	.subscribe(param => {
	  		this.category = param.get('category');

	  		//filter products by category
	  		this.filteredProducts = (this.category) ?
	  			this.products.filter( p => p.category === this.category) :
	  			this.products;
	  	});
	  	
	  }

  ngOnInit() {
  }

}
