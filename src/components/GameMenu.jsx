export default function GameMenu({ difficulty, setDifficulty, setGameStart }) {
  return (
    <>
      <div className="button-container">
        <button
          onClick={() => setDifficulty("easy")}
          className={difficulty === "easy" ? "active" : ""}
        >
          Easy
        </button>
        <button
          onClick={() => setDifficulty("medium")}
          className={difficulty === "medium" ? "active" : ""}
        >
          Medium
        </button>
        <button
          onClick={() => setDifficulty("hard")}
          className={difficulty === "hard" ? "active" : ""}
        >
          Hard
        </button>
      </div>
      <div className="button-container">
        <button onClick={() => setGameStart(true)} className="game-start-btn">
          Game Start
        </button>
      </div>
    </>
  );
}
