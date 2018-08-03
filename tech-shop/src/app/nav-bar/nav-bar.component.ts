import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable'



@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
	user$ : Observable <firebase.User>;

  constructor( private afAuth : AngularFireAuth) { 
  	this.user$ = afAuth.authState;

  }

  logout() {
  	this.afAuth.auth.signOut();

  }
}
