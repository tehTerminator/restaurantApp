import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Order } from 'src/app/interface/order.interface';
import { Product } from 'src/app/interface/product.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { OrderService } from '../../services/orders.service';
import { Category } from '../../../../../interface/product.interface';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  standalone: false,
})
export class ListProductsComponent implements OnInit {
  private _orders: Array<Order> = [];
  categories: Category[] = [];
  selectedCategory = 1;
  private location_id = 0;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private notification: NotificationsService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe({
      next: (params) => {
        const id = params['location_id'];
        if (id !== null && !isNaN(+id)) {
          this.location_id = +id;
          this.fetchProducts();
        }
      },
      error: (err) => {
        console.error('Error fetching params:', err);
        // Handle the error, such as navigating to an error page or showing a message
        this.notification.show('Error While Fetching Product ID');
      },
    });

    this.fetchCategories();
  }

  private storeProducts(products: Product[]) {
    if (products.length <= 0) return;

    this._orders = [];
    products.forEach((product) => {
      let order: Order = {
        id: 0,
        product: product,
        invoice_id: 0,
        product_id: product.id,
        location_id: this.location_id,
        quantity: 0,
        rate: product.rate,
        comments: '',
        status: 'OPEN',
      };

      this._orders.push(order);
    });
  }

  next() {
    let orderWithQuantity = this._orders.filter((x: Order) => x.quantity > 0);
    if (orderWithQuantity.length > 0) {
      this.orderService.setOrders(orderWithQuantity);
      this.router.navigate(['/auth', 'dashboard', 'list-orders']);
    } else {
      this.notification.show('Please Add Atleast One Product');
    }
  }

  private fetchProducts() {
    this.api.fetch<Array<Product>>('products').subscribe({
      next: (data: Product[]) => this.storeProducts(data),
      error: () => this.notification.show('Unable to Fetch Products'),
    });
  }

  private fetchCategories() {
    this.api.fetch<Category[]>('categories').subscribe({
      next: (data: Category[]) => (this.categories = data),
      error: (err) => {
        this.notification.show('Unable to Load Categories');
        console.error(err);
      },
    });
  }

  addQuantity(id: number) {
    const item = this._orders.find((x) => x.product_id === id);
    if (item) {
      item.quantity = (item.quantity || 0) + 1;
    }
  }

  removeQuantity(id: number) {
    const item = this._orders.find((x) => x.product_id === id);
    if (item) {
      item.quantity = Math.max((item.quantity || 0) - 1, 0);
    }
  }

  get orders(): Order[] {
    if (this.selectedCategory === 1) {
      return this._orders;
    }

    return this._orders.filter(
      (x) => x.product.category_id === this.selectedCategory
    );
  }
}
