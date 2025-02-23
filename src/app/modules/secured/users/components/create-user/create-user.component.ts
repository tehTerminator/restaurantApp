import { Component, OnInit } from '@angular/core';
import { UserFormGroup } from '../../UserFormGroup';
import { ApiService } from '../../../../../services/api/api.service';
import { NotificationsService } from '../../../../../services/notifications/notifications.service';
import { Role } from '../../../../../interface/role.interface';
import { finalize, Observable } from 'rxjs';
import { User } from '../../../../../interface/user.interface';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent implements OnInit {
  userFormGroup = new UserFormGroup();
  loading = false;
  roles: Role[] = []

  constructor(private api: ApiService, private notice: NotificationsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.api.fetch<Role[]>('roles')
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (value) => this.roles = value,
      error: (err) => {
        console.error(err);
        this.notice.show('Unable to Load Roles');
      }
    })
  }

  onSubmit() {
    if (this.userFormGroup.invalid) {
      this.notice.show('Please Check Form Data');
      return;
    }

    this.loading = true;

    if (this.userFormGroup.editMode) {
      this.handleResponse(this.api.update<User>('user', this.userFormGroup.value));
      return;
    }
    this.handleResponse(this.api.create<User>('user', this.userFormGroup.value));
  }

  private handleResponse(response: Observable<User>) {
    let message = 'Successfully '
    if (this.userFormGroup.editMode) {
      message += 'updated User Information ';
    } else {
      message += 'created New User';
    }

    response
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (value) => {
        this.notice.show(message);
        this.userFormGroup.reset();
      }, error: (err) => {
        this.notice.show('Error Occurred');
        console.error(err);
      }
    })
  }
}
