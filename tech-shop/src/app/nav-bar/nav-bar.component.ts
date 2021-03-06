import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from './../models/app-user';
import { ShoppingCartService } from './../shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './../models/shopping-cart';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

	appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  
  constructor( 
    private auth : AuthService,
    private shoppingCartService : ShoppingCartService ){}

  logout(){
  	this.auth.logout();
  }

  async ngOnInit(){
    // get app user 
    this.auth.appUser$.subscribe( appUser => this.appUser = appUser)
    
    //calculate the item count in shopping cart
    this.cart$ = await this.shoppingCartService.getCart();
   
  }

}
