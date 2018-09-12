// Module
import { environment } from './../environments/environment'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular5-data-table';

// Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component'

// Services
import { AuthGuardService } from './auth-guard.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductCardsComponent } from './product-cards/product-cards.component';
import { ProductsQuantityComponent } from './products-quantity/products-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductsFilterComponent,
    ProductCardsComponent,
    ProductsQuantityComponent,
    ShoppingCartSummaryComponent

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FormsModule,
    DataTableModule.forRoot(),

    RouterModule.forRoot([

    	{ path: '', component: ProductsComponent},//home page for now
      { path: 'login', component: LoginComponent},
    	{ path: 'products', component: ProductsComponent},
    	{ path: 'shopping-cart', component: ShoppingCartComponent},

      //must log-in protected route
    	{ path: 'check-out', 
        component: CheckOutComponent , 
        canActivate :[AuthGuardService]
      },
    	{ path: 'order-success/:id', 
        component: OrderSuccessComponent, 
        canActivate :[AuthGuardService]
      },
    	{ path: 'my/orders', 
        component: MyOrdersComponent, 
        canActivate :[AuthGuardService]},
      { path: 'my/orders/:id',
        component: MyOrdersComponent,
        canActivate: [AuthGuardService , AdminAuthGuardService]
      },
    	
      //admin routes
      { path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuardService , AdminAuthGuardService]
      },
      { path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService , AdminAuthGuardService]
      },
      { path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuardService , AdminAuthGuardService]
      },
  	  { path: 'admin/orders', 
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService , AdminAuthGuardService]
      },

    ])

  ],
  providers: [ 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
