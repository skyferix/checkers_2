import { useEffect, useReducer, useState } from "react";
import { GameManager } from "../../game-driver/GameManager";
import Row from "../row/Row";
import './board.scss';

const Board = (props: any) => {
	const [gameManager, setGameManager] = useState(new GameManager());
	const [, forceUpdate] = useReducer(x => x + 1, 0);

	useEffect(() => {
		gameManager.initialize();
		forceUpdate();
	}, [gameManager])

	const onSelectTile = (tile: any) => {
		const selectedTile = gameManager.getSelectedTile();
		if (selectedTile) {
			gameManager.movePiece(selectedTile, tile);
			gameManager.setSelectedTile(null);
		} else {
			gameManager.selectTile(tile);
		}
		forceUpdate();
	}

	return (
    <div className="container">
      <div className="board">
        {
          gameManager.getGameBoard().length && gameManager.getGameBoard().map((tiles: any) => {
						return (
							<Row 
								tiles={tiles}
								onSelectTile={(tile: any) => onSelectTile(tile)}
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