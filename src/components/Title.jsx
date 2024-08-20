import titleImage from "../assets/title.png";
import titleImageMobile from "../assets/title-mobile.png";

export default function Title({ restartGame }) {
  return (
    <>
      <img
        src={titleImage}
        alt="PokeMemory Game"
        className="game-title"
        onClick={restartGame}
      />
      <img
        src={titleImageMobile}
        alt="PokeMemory"
        className="game-title-mobile"
        onClick={restartGame}
      />
    </>
  );
}
