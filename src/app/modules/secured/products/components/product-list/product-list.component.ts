import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    standalone: false
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private api: ApiService,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.api.fetch<Product[]>('products').subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: () => {
        this.products = [];
        this.notifications.show('Error While Fetching Products');
      },
    });
  }
}
