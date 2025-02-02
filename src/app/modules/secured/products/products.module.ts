import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CoreModule } from './../../core/core.module';
import { CategoryListComponent } from './components/category-list/category-list.component';

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductListComponent,
    CategoryFormComponent,
    CategoryListComponent,
  ],
  imports: [CommonModule, CoreModule, ProductsRoutingModule],
})
export class ProductsModule {}
