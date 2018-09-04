import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {

	@Input('products')products : Product;
	@Input('showActions')showActions = true;
	@Input('shopping-cart-item') shoppingCartItems : ShoppingCart ;

  constructor(private cartService : ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(){
  	// call addToCart func in shopping cart-service
  	this.cartService.addToCart(this.products);	
  } 
}
