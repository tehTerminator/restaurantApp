import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [
    UsersComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreModule
  ]
})
export class UsersModule { }
