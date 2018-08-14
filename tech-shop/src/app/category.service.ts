import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }

  //get catergories list from firebase database 
  getCategories(){
  	return this.db.list('/categories',{
  		//filter categories by alphabet order
  		query: {
  			orderByChild: 'name'
  		}
  	});
  }
}
