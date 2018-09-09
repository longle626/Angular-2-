import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
  	private db : AngularFireDatabase,
  	private shoppingCartService: ShoppingCartService,
  ) { }
  // Store order's information into firebase 
  // and removed all items in shopping cart.
  async storeOrder(order : object){
  	let orders = await this.db.list('/order/').push(order);	
  	this.shoppingCartService.clearCart();
  	return orders;
  }
}
