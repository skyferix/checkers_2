import Tile from "../cell/Tile";
import './row.scss';

const Row = (props: any) => {
  return (
    <div className="row">
      {props.tiles.map((tile: any) => <Tile tile={tile} onSelectTile={props.onSelectTile} selectedTile={props.selectedTile} possibleMoves={props.possibleMoves}/>)}
    </div>
  );
}

export default Row;
