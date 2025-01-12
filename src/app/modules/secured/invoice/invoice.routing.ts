import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { SelectPaymentMethodComponent } from './components/select-payment-method/select-payment-method.component';
import { InvoiceComponent } from './invoice.component';

const routes: Routes = [
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
