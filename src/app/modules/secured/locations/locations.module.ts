import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsFormComponent } from './components/locations-form/locations-form.component';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LocationsFormComponent, LocationsListComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LocationsModule {}
