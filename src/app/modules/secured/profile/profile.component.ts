import { Component, OnInit } from '@angular/core';

import { AuthStoreService } from './../../../services/auth-store/auth-store.service';
import { UserForm } from './user.form';
import { ApiService } from './../../../services/api/api.service';
import { UserData } from '../../../services/authentication/user.model';
import { NotificationsService } from './../../../services/notifications/notifications.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
})
export class ProfileComponent implements OnInit {

  userForm = new UserForm();
  loading = false;

  constructor(private authStore: AuthStoreService, private api: ApiService, private notice: NotificationsService ) {}

  onSubmit(): void {
    if ( !this.userForm.invalid ){
      return;
    }

    this.api.update<UserData>('user', this.userForm.value)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (value) => {
        this.userForm.patchValue({
          name: value.name,
          mobile: value.mobile
        });
        this.notice.show('Update Success');
      },
      error: (err) => {
        console.error(err);
        this.notice.show('Unable to Update Data');
      }
    })
  }

  ngOnInit(): void {
    const userData = this.authStore.userData;
    this.userForm.patchValue({
      id: userData.id,
      name: userData.name,
      mobile: userData.mobile,
    });
  }

}
