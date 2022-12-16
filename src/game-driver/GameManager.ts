import { Board } from "./board/Board";
import { GameTile } from "./Tile";
import { Player } from "./types/types";

export class GameManager {
  private currentTurn: Player;
  private board: Board;
  
  constructor() {
    this.currentTurn = Player.WHITE;
    this.board = new Board();
  }

  public initialize() {
    this.board.initialize();
  }

  public selectTile(tile: GameTile | null) {
    this.board.setSelectedTile(tile, this.currentTurn);
  }

  public getSelectedTile() {
    return this.board.getSelectedTile();
  }

  private toggleTurn() {
    this.currentTurn = this.currentTurn === Player.BLACK ? Player.WHITE : Player.BLACK;
  }

  public getGameBoard = () => this.board.getBoard();
  public getBoard = () => this.board;
  public getPossibleMoves = () => this.board.getPossibleMoves();
  public getCurrentTurn = () => this.currentTurn;
}