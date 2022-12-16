export enum Player {
  WHITE, BLACK
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Move {
  coordinates: Coordinates;
  wouldDelete: Coordinates[];
}