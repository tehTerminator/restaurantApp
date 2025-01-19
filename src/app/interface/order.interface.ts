import { Entity } from './entity.interface';
import { Location } from './location.interface';
import { Product } from './product.interface';

export interface Order extends Entity {
  product: Product;
  invoice_id: number;
  product_id: number;
  location_id: number;
  quantity: number;
  rate: number;
  status: 'OPEN' | 'ACCEPTED' | 'COMPLETED' | 'PAID' | 'CANCELLED';
  comments: string;
  location?: Location;
}
