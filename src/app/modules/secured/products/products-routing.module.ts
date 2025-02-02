import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

const routes: Routes = [
  { path: 'create', component: ProductFormComponent },
  { path: 'update/:id', component: ProductFormComponent },
  { path: 'create/category', component: CategoryFormComponent },
  { path: 'update/category/:id', component: CategoryFormComponent },
  { path: 'view', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
