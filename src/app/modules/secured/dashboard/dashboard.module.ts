import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ListLocationsComponent } from './components/list-locations/list-locations.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DashboardComponent, ListLocationsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTabsModule,
    MatButtonModule,
  ],
})
export class DashboardModule {}
