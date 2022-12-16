import { Player } from "./types/types";

export class Piece {
  private belongsTo: Player; 
  private isKing: boolean = false;

  constructor(belongsTo: Player) {
    this.belongsTo = belongsTo;
  }

  getBelongsTo() {
    return this.belongsTo;
  }
}