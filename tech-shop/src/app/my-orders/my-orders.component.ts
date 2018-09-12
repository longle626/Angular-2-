import { Component, OnInit } from '@angular/core';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { DataTableResource } from 'angular5-data-table';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

	myOrder$;

  constructor(
  	private orderService : OrderService,
  	private authService: AuthService ) {
  		this.myOrder$ = authService.user$.
  		switchMap( user => orderService.getMyOrder(user.uid)
  		)
  	}
  ngOnInit() {
  }
}
