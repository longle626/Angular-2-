import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db : AngularFireDatabase) { }
  // Store order's information into firebase
  storeOrder(order : object){
  	return this.db.list('/order/').push(order);	
  }
}
