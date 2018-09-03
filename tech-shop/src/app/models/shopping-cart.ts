import { ShoppingCartItems } from './shopping-cart-items';

export class ShoppingCart {
	
	constructor( public items : ShoppingCartItems[] ){}
	// calculate total item in shopping cart
	get totalItems (){
		let count = 0;
    for (let productId in this.items)
      count +=  this.items[productId].quantity;
    return count;
	}
}