import { Product } from './product';


export class ShoppingCartItems {
	title: string;
	imageUrl: string;
	price: number;
	$key: string;
	quantity: number;

	constructor(init ?: Partial<ShoppingCartItems>){ 
		Object.assign(this,init);
	}
	// calculate total price for each item
	get totalPrice(){
		return this.price * this.quantity;
	}
}
