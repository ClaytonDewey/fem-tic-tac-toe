import useGameStore from '../store/useGameStore';

const ScoreCard = () => {
  const { scores, playerIcon } = useGameStore();

  // Determine player labels based on chosen icon
  const player1Icon = playerIcon;

  return (
    <div className='scorecard__wrapper'>
      <div className='scorecard card-x'>
        X ({player1Icon === 'X' ? 'P1' : 'P2'})<span>{scores.X}</span>
      </div>
      <div className='scorecard card-draw'>
        ties
        <span>{scores.draws}</span>
      </div>
      <div className='scorecard card-o'>
        O ({player1Icon === 'O' ? 'P1' : 'P2'})<span>{scores.O}</span>
      </div>
    </div>
  );
};
export default ScoreCard;
