import { Component } from '@angular/core';
import { CategoryFormGroup } from './CategoryForm';
import { ActivatedRoute } from '@angular/router';
import { take, Observable, from } from 'rxjs';
import { ApiService } from './../../../../../services/api/api.service';
import { NotificationsService } from './../../../../../services/notifications/notifications.service';
import {
  Category,
  EMPTY_CATEGORY,
} from '../../../../../interface/product.interface';

@Component({
  selector: 'app-category-form',
  standalone: false,
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  categoryFG = new CategoryFormGroup();

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
          this.categoryFG.id = +id;
          this.loadCategory();
        }
      },
      error: (err) => {
        console.error('Error fetching params:', err);
        // Handle the error, such as navigating to an error page or showing a message
        this.notification.show('Error While Fetching Category ID');
      },
    });
  }

  private loadCategory() {
    this.api
      .fetch<Category>('Category', { id: this.categoryFG.id.toString() })
      .subscribe({
        next: (Category: Category) => {
          this.categoryFG.title = Category.title;
        },
      });
  }

  onSubmit() {
    if (this.categoryFG.invalid) {
      return;
    }

    let response: Observable<Category> = from([EMPTY_CATEGORY]);

    if (this.categoryFG.editMode) {
      response = this.api.create<Category>('category', this.categoryFG.value);
    } else {
      response = this.api.create<Category>('category', this.categoryFG.value);
    }

    this.handleResponse(response);
  }

  private handleResponse(response: Observable<Category>) {
    let message = 'Category - ';
    response.subscribe({
      next: (value: Category) => {
        message += value.title;
        if (this.categoryFG.editMode) {
          message += ' Updated Successfully';
          return;
        }
        message += ' Created Successfully';
      },
      error: (err: any) => {
        message = 'Error While ';
        if (this.categoryFG.editMode) {
          message += ' Updating Record';
          return;
        }
        message += ' Storing New Record';
      },
      complete: () => {
        this.notification.show(message);
        this.categoryFG.reset();
      },
    });
  }
}
