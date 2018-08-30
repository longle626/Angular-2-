import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './../models/product';

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
  
  private async getOrCreateCart(){
  	// get cartId from local storage
  	let cartId = localStorage.getItem('cartId');
  	
  	// if we don't have then get it from firebase 
  	if(!cartId){
  		let result = await this.create();
  		
  		//store cartId to local storage
  		localStorage.setItem('cartId', result.key)
  		
  		// return the cart key
  		return this.getCart(result.key);
  		
  	}
  	return this.getCart(cartId)
  }

  addToCart(products: Product){

  }
}
