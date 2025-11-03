import useGameStore from '../store/useGameStore';

const ScoreCard = () => {
  const { scores, playerIcon, gameMode } = useGameStore();

  // Determine player labels based on chosen icon and game mode
  const getPlayerLabel = (icon) => {
    if (gameMode === 'cpu') {
      return icon === playerIcon ? 'YOU' : 'CPU';
    }
    return icon === playerIcon ? 'P1' : 'P2';
  };

  return (
    <div className='scorecard__wrapper'>
      <div className='scorecard card-x'>
        X ({getPlayerLabel('X')})<span>{scores.X}</span>
      </div>
      <div className='scorecard card-draw'>
        ties
        <span>{scores.draws}</span>
      </div>
      <div className='scorecard card-o'>
        O ({getPlayerLabel('O')})<span>{scores.O}</span>
      </div>
    </div>
  );
};
export default ScoreCard;
