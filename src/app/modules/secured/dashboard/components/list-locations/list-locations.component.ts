import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Location } from 'src/app/interface/location.interface';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-list-locations',
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '500ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
  standalone: false,
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
        this.notifications.show('Title Updated Success');
      },
      error: () =>
        this.notifications.show('Unable to Update Title of Location'),
    });
  }
}
