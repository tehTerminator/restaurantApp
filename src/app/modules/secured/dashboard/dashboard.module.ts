import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ListLocationsComponent } from './components/list-locations/list-locations.component';
import { MatButtonModule } from '@angular/material/button';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { CoreModule } from '../../core/core.module';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OpenOrdersComponent } from './components/open-orders/open-orders.component';
import { DailyOrdersComponent } from './components/daily-orders/daily-orders.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ListLocationsComponent,
    ListProductsComponent,
    ListOrdersComponent,
    OpenOrdersComponent,
    OrderSummaryComponent,
    DailyOrdersComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    DashboardRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
})
export class DashboardModule {}
