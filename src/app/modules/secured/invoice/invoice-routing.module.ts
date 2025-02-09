import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCustomerComponent } from './create-invoice/components/search-customer/search-customer.component';
import { CreateCustomerComponent } from './create-invoice/components/create-customer/create-customer.component';
import { SelectPaymentMethodComponent } from './create-invoice/components/select-payment-method/select-payment-method.component';
import { InvoiceComponent } from './create-invoice/invoice.component';
import { SetDiscountComponent } from './create-invoice/components/set-discount/set-discount.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';

const routes: Routes = [
  {
    path: 'print/:id',
    component: PrintInvoiceComponent,
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search-invoice/search-invoice.module').then(
        (m) => m.SearchInvoiceModule
      ),
  },
  {
    path: ':location',
    component: InvoiceComponent,
    children: [
      {
        path: 'search-customer',
        component: SearchCustomerComponent,
      },
      {
        path: 'create-customer',
        component: CreateCustomerComponent,
      },
      {
        path: 'set-discount',
        component: SetDiscountComponent,
      },
      {
        path: 'select-payment-method',
        component: SelectPaymentMethodComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/auth/404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
