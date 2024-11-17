import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LocationFormGroup } from '../../locationsFormGroup';
import { ActivatedRoute } from '@angular/router';
import { take, Observable, from } from 'rxjs';
import { Location, EMPTY_LOCATION } from 'src/app/interface/location.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-locations-form',
  templateUrl: './locations-form.component.html',
  styleUrls: ['./locations-form.component.css'],
})
export class LocationsFormComponent implements AfterViewInit {
  locationFormGroup = new LocationFormGroup();

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
          this.locationFormGroup.id = +id;
          this.loadLocation();
        }
      },
      error: (err) => {
        console.error('Error fetching params:', err);
        // Handle the error, such as navigating to an error page or showing a message
        this.notification.show('Error While Fetching Location ID');
      },
    });
  }

  private loadLocation() {
    this.api
      .fetch<Location>('Location', { id: this.locationFormGroup.id.toString() })
      .subscribe({
        next: (Location: Location) => {
          this.locationFormGroup.title = Location.title;
        },
      });
  }

  onSubmit() {
    if (this.locationFormGroup.invalid) {
      return;
    }

    let response: Observable<Location> = from([EMPTY_LOCATION]);

    if (this.locationFormGroup.editMode) {
      response = this.api.create<Location>(
        'location',
        this.locationFormGroup.value
      );
    } else {
      response = this.api.create<Location>(
        'location',
        this.locationFormGroup.value
      );
    }

    this.handleResponse(response);
  }

  private handleResponse(response: Observable<Location>) {
    let message = 'Location - ';
    response.subscribe({
      next: (value: Location) => {
        message += value.title;
        if (this.locationFormGroup.editMode) {
          message += ' Updated Successfully';
          return;
        }
        message += ' Created Successfully';
      },
      error: (err: any) => {
        message = 'Error While ';
        if (this.locationFormGroup.editMode) {
          message += ' Updating Record';
          return;
        }
        message += ' Storing New Record';
      },
      complete: () => {
        this.notification.show(message);
        this.locationFormGroup.reset();
      },
    });
  }
}
