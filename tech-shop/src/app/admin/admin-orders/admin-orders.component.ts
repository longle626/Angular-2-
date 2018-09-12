import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../order.service';
import { DataTableResource } from 'angular5-data-table';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

	order$;

  constructor( private orderService: OrderService ) {
  	this.order$ = orderService.getOrder();
  }

  ngOnInit() {
  	
  }
}
