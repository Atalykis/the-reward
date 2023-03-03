import type { Position, Size } from '../physics';

export interface Physical {
  size: Size;
  position: Position;
  getCenter(): Position;
}
