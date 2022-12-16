import { Piece } from "./Piece";
import { Coordinates, Player } from "./types/types";

export class GameTile {
  public piece: Piece | null = null;
  public id: number;
  public x: number;
  public y: number;
  
  constructor(id: number, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  public addPiece(belongsTo: Player) {
    this.piece = new Piece(belongsTo);
  }

  public getPiece() {
    return this.piece;
  }

  public setPiece(piece: Piece | null) {
    this.piece = piece;
  }

  public getCoordinates() {
    return {
      x: this.x,
      y: this.y
    } as Coordinates;
  }
}