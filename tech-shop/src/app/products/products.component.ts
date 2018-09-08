import { Component, OnInit , OnDestroy } from '@angular/core';
import { ProductsService } from './../products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

	products: any;
	filteredProducts: Product[] = [];
	category: string;
	cart : any;
	sub : Subscription;

  constructor( 
  	route: ActivatedRoute,
  	productsService: ProductsService , 
  	private shoppingCartService : ShoppingCartService,
  	){ 
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

  async ngOnInit() {
  	// get Cart object from shoppingCartService 
  	this.sub = (await this.shoppingCartService.getCart())
  		.subscribe(cart => this.cart = cart);
  }
  
  ngOnDestroy(){
  	// unsubscribe cart observable when it destroy
  	this.sub.unsubscribe();
  }
}
