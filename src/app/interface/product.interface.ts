import { Entity } from './entity.interface';

export interface Product extends Entity {
    title: string;
    rate: number;
    image_url: string;
}    

export const EMPTY_PRODUCT: Product = Object.freeze({
    id: 0,
    title: 'EMPTY_PRODUCT',
    rate: 0,
    image_url: ''
});
