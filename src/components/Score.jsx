export default function Pokemon({ currentScore, bestScore }) {
  return (
    <section className="score-container">
      <div className="score">Current Score: {currentScore}</div>
      <div className="score">Best Score: {bestScore}</div>
    </section>
  );
}
