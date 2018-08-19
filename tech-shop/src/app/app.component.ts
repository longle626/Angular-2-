import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'tech-shop';

	constructor(private userService: UserService, private auth: AuthService, router : Router){	
		
		//redirect user after log in
		auth.user$.subscribe( user => {
			if(!user) return;
			userService.save(user);
			//get return URL 
			let returnUrl = localStorage.getItem('returnUrl');
			if(!returnUrl) return;
				//remove return URL in local storage
				localStorage.removeItem('returnUrl');
				router.navigateByUrl(returnUrl);
		});
  }
}
