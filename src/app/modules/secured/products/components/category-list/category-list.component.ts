import { Component } from '@angular/core';
import { Product } from '../../../../../interface/product.interface';
import { ApiService } from '../../../../../services/api/api.service';
import { NotificationsService } from '../../../../../services/notifications/notifications.service';

@Component({
  selector: 'app-category-list',
  standalone: false,

  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {
  categories: Product[] = [];
  constructor(
    private api: ApiService,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.api.fetch<Product[]>('categories').subscribe({
      next: (categories: Product[]) => {
        this.categories = categories;
      },
      error: () => {
        this.categories = [];
        this.notifications.show('Error While Fetching Products');
      },
    });
  }
}
