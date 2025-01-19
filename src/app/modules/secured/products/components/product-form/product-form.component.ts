import { AfterViewInit, Component } from '@angular/core';
import { ProductForm } from './product-form';
import { ApiService } from 'src/app/services/api/api.service';
import { EMPTY_PRODUCT, Product } from 'src/app/interface/product.interface';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { Observable, catchError, from, take } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.scss',
    standalone: false
})
export class ProductFormComponent implements AfterViewInit {
  productForm = new ProductForm();

  constructor(
    private api: ApiService,
    private notification: NotificationsService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.route.params.pipe(take(1)).subscribe({
      next: (params) => {
        const id = params['id'];
        if (id !== null && !isNaN(+id)) {
          this.productForm.id = +id;
          this.loadProduct();
        }
      },
      error: (err) => {
        console.error('Error fetching params:', err);
        // Handle the error, such as navigating to an error page or showing a message
        this.notification.show('Error While Fetching Product ID');
      },
    });
  }

  private loadProduct() {
    this.api
      .fetch<Product>('product', { id: this.productForm.id.toString() })
      .subscribe({
        next: (product: Product) => {
          this.productForm.title = product.title;
          this.productForm.rate = product.rate;
          this.productForm.imageUrl = product.image_url;
        },
      });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    let response: Observable<Product> = from([EMPTY_PRODUCT]);

    if (this.productForm.editMode) {
      response = this.api.create<Product>('product', this.productForm.value);
    } else {
      response = this.api.create<Product>('product', this.productForm.value);
    }

    this.handleResponse(response);
  }

  private handleResponse(response: Observable<Product>) {
    let message = 'Product - ';
    response.subscribe({
      next: (value: Product) => {
        message += value.title;
        if (this.productForm.editMode) {
          message += ' Updated Successfully';
          return;
        }
        message += ' Created Successfully';
      },
      error: (err: any) => {
        message = 'Error While ';
        if (this.productForm.editMode) {
          message += ' Updating Record';
          return;
        }
        message += ' Storing New Record';
      },
      complete: () => {
        this.notification.show(message);
        this.productForm.reset();
      },
    });
  }
}
