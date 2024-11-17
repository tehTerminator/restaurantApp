import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsFormComponent } from './components/locations-form/locations-form.component';
import { LocationsListComponent } from './components/locations-list/locations-list.component';

const routes: Routes = [
  { path: 'create', component: LocationsFormComponent },
  { path: 'update/:id', component: LocationsFormComponent },
  { path: 'view', component: LocationsListComponent },
  { path: '**', redirectTo: 'view', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsRoutingModule {}
