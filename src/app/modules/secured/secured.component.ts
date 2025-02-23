import { Component, OnInit } from '@angular/core';

import { UserStoreService } from '../../services/user/user.service';
import { ApiService } from '../../services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { CalculatorComponent } from './calculator/calculator.component';

@Component({
    selector: 'app-secured',
    templateUrl: './secured.component.html',
    styleUrls: ['./secured.component.scss'],
    standalone: false
})
export class SecuredComponent implements OnInit {
  appName = 'Chatpati Chat';
  constructor(
    private userService: UserStoreService,
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  onOpenCalc() {
    this.dialog.open(CalculatorComponent);
  }
}