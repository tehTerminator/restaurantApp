import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Location } from 'src/app/interface/location.interface';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-list-locations',
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.css'],
})
export class ListLocationsComponent implements OnInit {
  locations: Array<Location> = [];

  constructor(
    private api: ApiService,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {
    this.api.fetch<Array<Location>>('locations').subscribe({
      next: (response: Array<Location>) => (this.locations = response),
      error: () => this.notifications.show('Unable to Load Location'),
    });
  }

  updateTitle(id: number) {
    const indexOfItem = this.locations.findIndex((x) => x.id === id);
    if (indexOfItem < 0) {
      return;
    }

    const title = this.locations[indexOfItem].title;

    this.api.update<Location>('location', { title, id }).subscribe({
      next: () => {
        this.locations[indexOfItem].title = title;
      },
      error: () =>
        this.notifications.show('Unable to Update Title of Location'),
    });
  }
}
