import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
  	// add dateCreated to firebase db 
  	return this.db.list('/shopping-carts').push({
  		dateCreated: new Date().getTime()
  	})
  }
  // get Cart object from firebase 
  private getCart(cartId){
  	return this.db.object('/shopping-carts/' + cartId);
  }
  
  private async getOrCreateCartId(){
  	// get cartId from local storage
  	let cartId = localStorage.getItem('cartId');
  	
  	// if we  have cartId then return it
  	if (cartId) return cartId;

  	// call create func and store cartId into result varible
		let result = await this.create();
		
		//store cartId to local storage
		localStorage.setItem('cartId', result.key)
		
		// return the cart key
		return result.key;  		
  }

  // add item to shopping cart
  async addToCart(products: Product){
  	//get cartID
  	let cartId = await this.getOrCreateCartId();
  	//add items to shopping-cart/firebase db
  	let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + products.$key);
  	item$.take(1).subscribe(item => {
  		if(item.$exists()) item$.update({
  			quantity: item.quantity + 1
  		});
  		else item$.set({products : products , quantity : 1 })
  	})
  } 
}
