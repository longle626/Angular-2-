import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import { ProductsService } from './../../products.service';
import { Router , ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

	categories$;
	product = {};
	id;
	
  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
  	private catergoryService: CategoryService,
  	private productsService: ProductsService )
  	{ 
  		this.categories$ = catergoryService.getCategories();

  		// get id from the route param then pass to product service to get 
  		//  the product object according to the id.
  		this.id = this.route.snapshot.paramMap.get('id');
  		if (this.id) this.productsService.getProduct(this.id).take(1).subscribe(p => this.product = p)
  	}

  ngOnInit() {
  }

  // send new products to products service 
  save(product){
  	// if there is a id then update the product
  	if(this.id)  this.productsService.update( this.id, product) 

  	// else create a new product
  	else this.productsService.create(product);

  	//navigate back to product page
  	this.router.navigate(['/admin/products']);
  }

  //delete a product
  delete(){
  	this.productsService.delete(this.id);

  	//navigate back to product page
  	this.router.navigate(['/admin/products']);
  }



}
