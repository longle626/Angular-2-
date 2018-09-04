import { Product } from './product';

export class ShoppingCartItems {


	constructor(public products: Product, public quantity: number){ }
	// calculate total price for each item
	get totalPrice(){
		return this.products.price * this.quantity;
	}
}
