import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
