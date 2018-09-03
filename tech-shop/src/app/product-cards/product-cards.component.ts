import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';


@Component({
  selector: 'product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {

	@Input('products')products : Product;
	@Input('showActions')showActions = true;
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

  getQuantity(){
  	// get quantity from cart object that pass by product.component 
  	if(!this.shoppingCartItems) return 0;
  	let item = this.shoppingCartItems.items[this.products.$key];
  	return item ? item.quantity : 0;
  }
}
