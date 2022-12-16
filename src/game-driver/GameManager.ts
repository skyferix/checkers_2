import { initialPieces } from "./board/data";
import { Coordinates, Move, Player } from "./types/types";

export class GameManager {
  private currentTurn: Player;

  private board: any = [];
  private selectedTile  : any = null;
  private possibleMoves = [] as Move[];
  public initialize() {
    this.resetBoard();
    this.setInitialBoard();
  }
  public movePiece(from: Coordinates, to: Coordinates) {
    const pieceToMove = this.board[from.y][from.x].piece;
    if (pieceToMove && this.isMoveValid(pieceToMove, to)) {
      const toDelete = this.possibleMoves.find((move) => move.coordinates.x === to.x && move.coordinates.y === to.y);toDelete?.wouldDelete.forEach((tile, index) => this.board[tile.y][tile.x].setPiece(null));this.board[from.y][from.x].setPiece(null);
      this.board[to.y][to.x].setPiece(pieceToMove);
      this.possibleMoves = new Array();
    }
  }
  private isMoveValid(pieceToMove: any, to: Coordinates) {
    return this.possibleMoves.some((move) => {
      return to.x === move.coordinates.x && to.y === move.coordinates.y;
    });
  }
  public findAllPossibleMoves(tileToMove: any): Move[] {
    const pieceToMove = tileToMove.piece;
    console.log({ tileToMove});
    if (pieceToMove) {
      const possibleMoves: Move[] = [];
      const directionOfMotion = [pieceToMove.belongsTo === Player.BLACK ? 1 : -1];
      const leftOrRight = [1, -1];

      for (let j = 0; j < directionOfMotion.length; j++) {
        for (let i = 0; i < leftOrRight.length; i++) {
          const moveY = tileToMove.y + directionOfMotion[j];
          const moveX = tileToMove.x + leftOrRight[i];
          
          console.log(this.board);
          if (
            this.board[moveY] !== undefined &&
            this.board[moveY][moveX] !== undefined &&
            this.board[moveY][moveX].piece === null
          ) {
            possibleMoves.push({
              coordinates: {
                x: moveX,
                y: moveY,
              },
              wouldDelete: []
            });
          }}}
      const jumps = this.findAllJumps(tileToMove.x, tileToMove.y, this.board, directionOfMotion[0], [], [], false, pieceToMove.belongsTo);
      for (let i = 0; i < jumps.length; i++) {
        possibleMoves.push(jumps[i]);
      }
      console.log({ possibleMoves});
      return possibleMoves;
    }
    return [];
  }
  public findAllJumps(x: number, y: number, board: any[][], directionOfMotion: number, possibleJumps: Move[], wouldDelete: Coordinates[], isKing: boolean, activePlayer: Player): Move[] {
    var thisIterationDidSomething = false;
    var directions = [directionOfMotion];
    var leftOrRight = [1, -1];

    if (isKing) {
      directions.push(directions[0] * -1);
    }

    for (let k = 0; k < directions.length; k++) {
      for (let l = 0; l < leftOrRight.length; l++) {
        if (
          this.board[y + directions[k]] && 
          this.board[y + directions[k]][x + leftOrRight[l]] &&
          this.board[y + directions[k]][x + leftOrRight[l]].piece &&
          this.board[y + (directions[k] * 2)] &&
          this.board[y + (directions[k] * 2)][x + (leftOrRight[l] * 2)] &&
          this.board[y + directions[k]][x + leftOrRight[l]].piece?.belongsTo !== this.board[y][x].piece?.belongsTo &&
          !this.board[y + (directions[k] * 2)][x + (leftOrRight[l] * 2)].piece  
        ) {
          if (possibleJumps.map(
            (move) => String(move.coordinates.y) + String(move.coordinates.x)
          ).indexOf(String(y + (directions[k] * 2))+String(x + (leftOrRight[l] * 2))) < 0) {
            //this eventual jump target did not already exist in the list
            const tempJumpObject: any = {
              coordinates: {
                y: y + (directions[k]*2),x: x + (leftOrRight[l]*2),
              },
              wouldDelete:[{
                  y: y + directions[k],x: x + leftOrRight[l]
                }]
            };
            for (var i = 0; i < wouldDelete.length; i++) {
              tempJumpObject.wouldDelete.push(wouldDelete[i]);
            }
            possibleJumps.push(tempJumpObject);
            thisIterationDidSomething = true;
      }}}
    }
    if(thisIterationDidSomething) {
			for (let i = 0; i < possibleJumps.length; i++) { var coords = [possibleJumps[i].coordinates.y, possibleJumps[i].coordinates.x];
			var children = this.findAllJumps(coords[0], coords[1], board, directionOfMotion, possibleJumps, possibleJumps[i].wouldDelete, isKing, activePlayer);
  		for (var j = 0; j < children.length; j++) {
  		if (possibleJumps.indexOf(children[j]) < 0) {
      		  possibleJumps.push(children[j]);
      		}
        }
      }
		}
		return possibleJumps;
  }
  setSelectedTile(
    tile: any, currentTurn?: Player
  ) {if (tile?.piece?.belongsTo === currentTurn) {
        this.selectedTile = tile;
        if (tile) {
          this.possibleMoves = this.findAllPossibleMoves(tile);
          return;
        }
  }
  return this.possibleMoves = [];
  }

  private removeBoard() {
    return undefined;
  }
  public getSelectedTile() {
    return this.selectedTile;
  }
  public getPossibleMoves(move?: any) {
    return this.possibleMoves;
  }
  public getBoard = (boolean?: boolean) => this.board;
  resetBoard() {
    const newBoard: any = [];
    var id = 0;
    for (var y = 0; y < 8; y++) {
      newBoard[y] = [];
      for (let x = 0; x < 8; x++) {
        newBoard[y][x] = {id, x, y};
      }
      id++;
    }
    this.board = newBoard;
  }
  setInitialBoard() {
    for (const {x, y, belongsTo} of initialPieces) {
    this.board[y][x].piece = {belongsTo};
    }
  }
  
  constructor() {
    this.currentTurn = Player.WHITE;
    this.board = [];
  }
  

  public selectTile(tile: any) {
    this.setSelectedTile(tile, this.currentTurn);
  }
  
  private toggleTurn() {
    this.currentTurn = this.currentTurn === Player.BLACK ? Player.WHITE : Player.BLACK;
  }

  public getGameBoard = () => {
    console.log(this.board);
    return this.board;
  };
  public getCurrentTurn = () => this.currentTurn;
}