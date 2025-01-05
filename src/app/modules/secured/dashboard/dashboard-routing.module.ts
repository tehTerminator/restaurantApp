import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListLocationsComponent } from './components/list-locations/list-locations.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'select-location', component: ListLocationsComponent },
      {
        path: 'select-products/:location_id',
        component: ListProductsComponent,
      },
      {
        path: 'list-orders',
        component: ListOrdersComponent,
      },
      { path: '**', redirectTo: 'select-location', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
