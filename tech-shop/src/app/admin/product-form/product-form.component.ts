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

  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
  	private catergoryService: CategoryService,
  	private productsService: ProductsService )
  	{ 
  		this.categories$ = catergoryService.getCategories();

  		// get id from the route param then pass to product service to get 
  		//  the product object according to the id.
  		let id = this.route.snapshot.paramMap.get('id');
  		if (id) this.productsService.getProduct(id).take(1).subscribe(p => this.product = p)
  	}

  ngOnInit() {
  }
  // send new products to products service
  save(product){
  	this.productsService.create(product);
  	this.router.navigate(['/admin/products']);
  }
}
