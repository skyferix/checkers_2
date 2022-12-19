import { useEffect, useReducer, useState } from "react";
import { GameManager } from "../../game-driver/GameManager";
import { GameTile } from "../../game-driver/Tile";
import Tile from "../cell/Tile";
import Row from "../row/Row";
import Statistics from "../statistics/Statistics";
import './board.scss';

const Board = (props: any) => {
	const [gameManager] = useState(new GameManager());
	const [, forceUpdate] = useReducer(x => x + 1, 0);

	useEffect(() => {
		gameManager.initialize();
		forceUpdate();
	}, [gameManager])

	const onSelectTile = (tile: GameTile) => {
		const selectedTile = gameManager.getSelectedTile();
		if (selectedTile) {
			gameManager.getBoard().movePiece(selectedTile, tile);
			gameManager.getBoard().setSelectedTile(null);
			gameManager.toggleTurn();
		} else {
			gameManager.selectTile(tile);
		}
		forceUpdate();
	}

	return (
    <div className="container">
      <div className="board">
        {
          gameManager.getGameBoard().map(tiles => {
						return (
							<Row 
								tiles={tiles}
								onSelectTile={(tile: GameTile) => onSelectTile(tile)}
								selectedTile={gameManager.getSelectedTile()}
								possibleMoves={gameManager.getPossibleMoves()}
							/>
						);
					})
        }
      </div>
    </div>
  );
};

export default Board;