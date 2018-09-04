import { Component, OnInit , Input } from '@angular/core';
import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';


@Component({
  selector: 'products-quantity',
  templateUrl: './products-quantity.component.html',
  styleUrls: ['./products-quantity.component.css']
})
export class ProductsQuantityComponent implements OnInit {

	@Input('products')products : Product;
	@Input('shopping-cart-item') shoppingCartItems ;

  constructor(private cartService : ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(){
  	// call addToCart func in shopping cart-service
  	this.cartService.addToCart(this.products);	
  }

  removeFromCart(){
  	// call removeFromCart func in shopping cart-service
  	this.cartService.removeFromCart(this.products)
  }

  
}
