export default function Pokemon({
  currentScore,
  bestScore,
  gameStart,
  difficulty,
}) {
  function showBestScoreDifficulty() {
    if (difficulty === "easy")
      return <div className="score">Best Score (Easy): {bestScore.easy}</div>;
    else if (difficulty === "medium")
      return (
        <div className="score">Best Score (Medium): {bestScore.medium}</div>
      );
    else if (difficulty === "hard")
      return <div className="score">Best Score (Hard): {bestScore.hard}</div>;
  }
  return (
    <section className={gameStart ? "score-container" : "game-start"}>
      {gameStart && <div className="score">Current Score: {currentScore}</div>}
      {showBestScoreDifficulty()}
    </section>
  );
}
