import { Component, OnInit , OnDestroy } from '@angular/core';
import { ProductsService } from './../../products.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './../../models/product';
import { DataTableResource } from 'angular5-data-table';
import { DataTableModule } from 'angular5-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

	products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items : Product[] = [];
  itemCount: number;

  constructor( private productService: ProductsService) {
    this.subscription = this.productService.getAll().
    subscribe(p => {
      this.products = p
      this.initializeTable(p);
    });

  }
  // initialize table data
  private initializeTable( products: Product[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset:0 })
      .then (items => this.items = items);
    this.tableResource.count()
      .then (count => this.itemCount = count);
  }

  //reload item 
  reloadItems(params){
    if (!this.tableResource) return;
    this.tableResource.query(params)
      .then (items => this.items = items);
  }

  // filtering product 
  filter(query: string){
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().
      includes(query.toLowerCase())) : this.products;
      
    // pass filtered product data to initialize table
    this.initializeTable(filteredProducts);
  }

  //unsubscribe product
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit() {	
  }

}
