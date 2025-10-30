const ScoreCard = () => {
  return (
    <div className='scorecard__wrapper'>
      <div className='scorecard card-x'>
        x (p2)
        <span>14</span>
      </div>
      <div className='scorecard card-draw'>
        ties
        <span>32</span>
      </div>
      <div className='scorecard card-o'>
        o (p1)
        <span>11</span>
      </div>
    </div>
  );
};
export default ScoreCard;
