import { Inject } from '@angular/core';
import { ApiService } from './../../../../services/api/api.service';
import { NotificationsService } from './../../../../services/notifications/notifications.service';
import { BehaviorSubject } from 'rxjs';

@Inject({})
export class PrintInvoiceService {
  invoices$ = new BehaviorSubject<Invoice[]>([]);
  invoice$ = new 
  constructor(private api: ApiService, private notice: NotificationsService) {}

  loadInvioce;
}
