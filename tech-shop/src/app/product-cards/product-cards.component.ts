import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../models/product'

@Component({
  selector: 'product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {

	@Input('products')products : Product;
	@Input('showActions')showActions = true;

  constructor() { }

  ngOnInit() {
  }

}
