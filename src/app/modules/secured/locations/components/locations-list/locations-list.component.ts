import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { Location } from 'src/app/interface/location.interface';

@Component({
    selector: 'app-locations-list',
    templateUrl: './locations-list.component.html',
    styleUrls: ['./locations-list.component.css'],
    standalone: false
})
export class LocationsListComponent implements OnInit {
  locations: Location[] = [];
  constructor(
    private api: ApiService,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {
    this.fetchLocations();
  }

  fetchLocations() {
    this.api.fetch<Location[]>('locations').subscribe({
      next: (locations: Location[]) => {
        this.locations = locations;
      },
      error: () => {
        this.locations = [];
        this.notifications.show('Error While Fetching Locations');
      },
    });
  }
}
