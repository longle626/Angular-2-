import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../products.service';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

	products$;

  constructor( private productService: ProductsService) {
  	this.products$ = this.productService.getAll();

  }

  ngOnInit() {
  	
  }

}
