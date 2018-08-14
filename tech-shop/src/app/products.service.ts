import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }
  
  //save new products to firebase database
  create(product){
  	return this.db.list('/products').push(product);
  }
}
