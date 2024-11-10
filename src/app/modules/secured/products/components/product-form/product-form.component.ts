import { Component } from '@angular/core';
import { ProductForm } from './product-form';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  productForm = new ProductForm();
}
