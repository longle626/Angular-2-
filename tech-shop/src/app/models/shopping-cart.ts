import { ShoppingCartItems } from './shopping-cart-items';
import { Product } from './../models/product';

export class ShoppingCart {
	
	items : ShoppingCartItems[] = [];

	constructor( public itemsMap : {[productsId : string] : ShoppingCartItems}){
		// Iterate through shopping cart's items then push to the items array
		this.itemsMap = itemsMap || {};
		for ( let productsId in itemsMap) {
			let item = itemsMap[productsId];		
			this.items.push(new ShoppingCartItems({
				...item, $key: productsId
			}));	
		}
	}
	// Calculate total item in shopping cart
	get totalItems (){
		let count = 0;
    for (let productId in this.itemsMap)
      count +=  this.itemsMap[productId].quantity;
    return count;
	}

	// Get sum of total price
	get sumTotalPrice (){
		let sum = 0;
		for (let productsId in this.items){
			sum += this.items[productsId].totalPrice;
		}
		return sum;
	}

	getQuantity(products: Product){
  	// Get quantity from cart object that pass by product.component 	
  	let item = this.itemsMap[products.$key];
  	return item ? item.quantity : 0;
  }
}