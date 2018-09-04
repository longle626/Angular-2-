import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart'
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


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
  async getCart() : Promise<Observable<ShoppingCart>> {
  	let cartId = await this.getOrCreateCartId();
  	return this.db.object('/shopping-carts/' + cartId)
  	.map( x => new ShoppingCart(x.items));
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
  addToCart(products: Product){
  	this.updateQuantity(products , 1)
  } 
  // remove item from shopping cart
  removeFromCart(products:Product){
  	this.updateQuantity( products,-1)
  }
  // update quantity based on add/remove action in shopping cart
  private async updateQuantity(products: Product ,  quantity: number){
  	// get cartID
  	let cartId = await this.getOrCreateCartId();
  	// update item quantity to shopping-cart/firebase db
  	let item$ = this.getItem(cartId , products.$key);
  	item$.take(1).subscribe(item => {
  		item$.update({products : products ,quantity: (item.quantity || 0) + quantity });		
  	});
  }
}
