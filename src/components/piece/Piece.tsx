import { Player } from "../../game-driver/types/types";
import './piece.scss';

const Piece = (props: any) => {

  const getColor = (belongsTo: Player) => {
    switch(belongsTo) {
      case Player.BLACK:
        return 'black';
      case Player.WHITE:
        return 'white';
    }
  }

  return(
    <div className={`piece piece--${getColor(props.piece.belongsTo)}`}/>
  );
}

export default Piece;