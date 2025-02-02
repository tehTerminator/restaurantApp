import { Entity } from './entity.interface';

export interface Product extends Entity {
  title: string;
  category_id: number;
  rate: number;
  image_url: string;
}

export interface Category extends Entity {
  title: string;
}

export const EMPTY_PRODUCT: Product = Object.freeze({
  id: 0,
  title: 'EMPTY_PRODUCT',
  category_id: 0,
  rate: 0,
  image_url: '',
});

export const EMPTY_CATEGORY: Category = Object.freeze({
  id: 0,
  title: '',
});
