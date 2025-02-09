import { Customer, EMPTY_CUSTOMER } from './customer';
import { Entity } from './entity.interface';

export interface Invoice extends Entity {
  customer_id: number;
  customer?: Customer;
  amount: number;
  discount: number;
  payment_method: 'CASH' | 'UPI' | 'ZOMATO' | 'UNPAID';
}

export const EMPTY_INVOICE: Invoice = Object.freeze({
  id: 0,
  customer_id: 0,
  customer: EMPTY_CUSTOMER,
  amount: 0,
  discount: 0,
  payment_method: 'UNPAID',
});
