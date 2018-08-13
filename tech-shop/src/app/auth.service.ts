import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import * as  firebase from 'firebase';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

	user$ : Observable <firebase.User>;

  constructor( 
  	private userService: UserService,
  	private afAuth : AngularFireAuth , 
  	private route: ActivatedRoute) { 
  		this.user$ = afAuth.authState;
  }

	login(){
		//set return url and save in local storage
		let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
		localStorage.setItem('returnUrl ', returnUrl);

		//send to google for authenticate
		this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
	}

	logout() {
  	this.afAuth.auth.signOut();
  }
  //get app user object 
  get appUser$() : Observable<AppUser> {
  	return this.user$
  		.switchMap(user => {
  			if (user ) return this.userService.get(user.uid);
  			// return observable emit null value 
  			return Observable.of(null);
  		});
  }
}