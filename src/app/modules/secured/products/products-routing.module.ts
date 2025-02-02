import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

const routes: Routes = [
  { path: 'create', component: ProductFormComponent },
  { path: 'update/:id', component: ProductFormComponent },
  { path: 'category/create', component: CategoryFormComponent },
  { path: 'category/update/:id', component: CategoryFormComponent },
  { path: 'category/view', component: CategoryListComponent },
  { path: 'view', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
