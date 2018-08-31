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

  constructor(private cartService : ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(products: Product){
  	// call addToCart func in shopping cart-service
  	this.cartService.addToCart(products);	
  }
}
