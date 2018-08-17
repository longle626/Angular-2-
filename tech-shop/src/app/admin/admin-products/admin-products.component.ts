import { Component, OnInit , OnDestroy } from '@angular/core';
import { ProductsService } from './../../products.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

	products: {title: string}[];
  filteredProducts : any[];
  subscription: Subscription;

  constructor( private productService: ProductsService) {
    this.subscription = this.productService.getAll().
    subscribe(p => this.filteredProducts = this.products = p);

  }
  // filtering product 
  filter(query: string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().
      includes(query.toLowerCase())) : this.products;
  }
  //unsubscribe product
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit() {	
  }

}
