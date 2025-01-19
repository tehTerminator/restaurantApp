import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Customer } from 'src/app/interface/customer';
import { CustomerFormGroup } from './CustomerFormGroup';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { MyInvoiceService } from '../../../my-invoice.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
    selector: 'app-create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: ['./create-customer.component.css'],
    standalone: false
})
export class CreateCustomerComponent implements OnInit, AfterViewInit {
  customerFG = new CustomerFormGroup();
  @ViewChild('customerTitle') titleField!: ElementRef;

  constructor(
    private api: ApiService,
    private notice: NotificationsService,
    private invoiceStore: MyInvoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const mobile = this.route.snapshot.queryParams['mobile'];
    if (!!mobile) {
      this.customerFG.patchValue({ mobile });
    }
  }

  ngAfterViewInit(): void {
    this.titleField.nativeElement.focus();
  }

  onSubmit() {
    if (this.customerFG.invalid) {
      this.notice.show('Invalid Data Provided');
      return;
    }

    this.api.create<Customer>('customer', this.customerFG.customer).subscribe({
      next: (value) => {
        this.invoiceStore.customer = value;
        this.router.navigate(['../set-discount'], {
          relativeTo: this.route,
        });
      },
      error: () => {
        this.notice.show('Unable to Store Customer');
      },
    });
  }
}
