import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { ListLocationsComponent } from './components/list-locations/list-locations.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { ListProductsComponent } from './components/list-products/list-products.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule
  ],
  declarations: [OrdersComponent, ListLocationsComponent, ListProductsComponent]
})
export class OrdersModule { }
