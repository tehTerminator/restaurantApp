import { Entity } from './entity.interface';

export interface Location extends Entity {
  title: string;
}

export const EMPTY_LOCATION: Location = Object.freeze({
  id: 0,
  title: 'Sample Location',
});
