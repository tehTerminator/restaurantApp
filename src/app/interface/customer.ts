import { Entity } from './entity.interface';

export interface Customer extends Entity {
  title: string;
  mobile: string;
}

export const EMPTY_CUSTOMER: Customer = {
  id: 0,
  title: 'Anonymous',
  mobile: '8888888888',
};
