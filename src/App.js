function App() {
  return (
    <div className='App'>
      <div>
        Pick player 1's mark
        <br />
        Remember: X goes first
        <br />
        <br />
        New Game (vs CPU)
        <br />
        New Game (vs player)
        <br />
        <br />
        {/* New game menu end */}
        {/* Game board start */}
        {/* x/o icon   */} turn
        <br />
        X (You)
        <br /> {/* Your score */}
        Ties
        <br /> {/* Ties score*/}
        X (CPU)
        <br /> {/* CPU score*/}
        Oh no, you lost
        <br />
        You won!
        <br />
        Player {/* 1/2*/} wins!
        <br />
        {/* x/o icon*/} takes the round
        <br />
        Round tied
        <br />
        Restart game?
        <br />
        Quit
        <br />
        Next round
        <br />
        No, cancel
        <br />
        Yes, restart
        <br />
      </div>
    </div>
  );
}

export default App;
