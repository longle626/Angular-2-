import { Injectable } from '@angular/core';
import { AngularFireDatabase , FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private db : AngularFireDatabase) { }
	//save user to firebase database
	save (user : firebase.User ) {
		this.db.object('/users/' + user.uid).update({
			name: user.displayName,
			email: user.email
		})


  }
  // get user id from firebase database
  get(uid:string) : FirebaseObjectObservable<AppUser> {
  	return this.db.object('/users/' + uid);
  }
}
