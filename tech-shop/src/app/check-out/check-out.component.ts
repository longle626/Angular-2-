import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCart } from './../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Order } from './../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

	shipping = {};
	cart: ShoppingCart;
	cartSubscription: Subscription;
	userSubscription: Subscription;
	userId: string;

  constructor(
  	private shoppingCartService : ShoppingCartService,
  	private orderService : OrderService,
  	private userService: AuthService,
  	private router : Router
   ) { }

  // Get the shopping cart object 
  async ngOnInit() {
  	let cart$ = await this.shoppingCartService.getCart();
  	this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
  	this.userSubscription = this.userService.user$.subscribe( user => this.userId = user.uid);
  }

  ngOnDestroy(){
  	// Unsubscribe when component destroy
  	this.cartSubscription.unsubscribe();
  	this.userSubscription.unsubscribe();
  }
  // Send shipping and item information to order service
  // then navigate to order-success page
  async placeOrder(){
  	let order =  new Order(this.userId, this.shipping, this.cart );
  	let result = await this.orderService.storeOrder(order);
  	this.router.navigate(['order-success', result.key ]);
  }
}
