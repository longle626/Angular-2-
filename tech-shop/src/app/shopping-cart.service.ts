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
  async getCart(){
  	let cartId = await this.getOrCreateCartId();
  	return this.db.object('/shopping-carts/' + cartId);
  } 
  
  private async getOrCreateCartId() : Promise<string>{
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
  // return shopping cart item
  private getItem (cartId : string , productsId: string){
  	return this.db.object('/shopping-carts/' + cartId + '/items/' + productsId);
  }

  // add item to shopping cart
  async addToCart(products: Product){
  	//get cartID
  	let cartId = await this.getOrCreateCartId();
  	//add items to shopping-cart/firebase db
  	let item$ = this.getItem(cartId , products.$key);
  	item$.take(1).subscribe(item => {
  		item$.update({products : products ,quantity: (item.quantity || 0) + 1});		
  	});
  } 
}
