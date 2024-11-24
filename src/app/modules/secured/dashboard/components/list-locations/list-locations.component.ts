import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Location } from 'src/app/interface/location.interface';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-list-locations',
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.css']
})
export class ListLocationsComponent implements OnInit {
  locations: Array<Location> = [];

  constructor(private api: ApiService, private notifications: NotificationsService) { }

  ngOnInit() {
    this.api.fetch<Array<Location>>('locations')
    .subscribe({
      next: (response: Array<Location>) => this.locations = response,
      error: (err: any) => this.notifications.show('Unable to Load Location')
    });
  }

}
