import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { ListLocationsComponent } from './components/list-locations/list-locations.component';
import { ListProductsComponent } from './components/list-products/list-products.component';

const routes: Routes = [
  {
    path: 'list-locations',
    component: ListLocationsComponent
  },
  {
    path: 'select-product',
    component: ListProductsComponent
  },
  {
    path: '**',
    redirectTo: '/list-locations',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
