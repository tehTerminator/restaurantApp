import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  {
    path: 'create-user',
    component: CreateUserComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
