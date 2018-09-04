import { ShoppingCartItems } from './shopping-cart-items';
import { Product } from './../models/product';

export class ShoppingCart {
	
	items : ShoppingCartItems[] = [];

	constructor( public itemsMap : {[productsId : string] : ShoppingCartItems}){
		//iterate through shopping cart's items then push to the items array
		for ( let productsId in itemsMap) {
			let item = itemsMap[productsId];
			this.items.push( new ShoppingCartItems (item.products , item.quantity));	
		}
	}
	// calculate total item in shopping cart
	get totalItems (){
		let count = 0;
    for (let productId in this.itemsMap)
      count +=  this.itemsMap[productId].quantity;
    return count;
	}

	// get sum of total price
	get sumTotalPrice (){
		let sum = 0;
		for (let productsId in this.items){
				sum = this.items[productsId].totalPrice + sum;
		}
		return sum;
	}

	getQuantity(products: Product){
  	// get quantity from cart object that pass by product.component 	
  	let item = this.itemsMap[products.$key];
  	return item ? item.quantity : 0;
  	
  }
}