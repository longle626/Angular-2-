import { Component, OnInit ,Input} from '@angular/core';
import { CategoryService } from '../../category.service';


@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
	
	categories$;
	@Input('category') category;

  constructor(
  	catergoryService: CategoryService) { 
  		this.categories$ = catergoryService.getCategories();
  }

  ngOnInit() {
  }
  

}
