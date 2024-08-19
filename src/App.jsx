import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import PokemonList from "./components/PokemonList";
import Score from "./components/Score";
import _ from "lodash";
import "./styles/App.css";

function App({}) {
  //Start of game
  const [gameStart, setGameStart] = useState(false);
  const [difficulty, setDifficulty] = useState("easy"); // Default difficulty
  const [difficultyLevels] = useState({
    easy: 6,
    medium: 12,
    hard: 20,
  });

  //Populate of Pokemon from API
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  //What Pokemon has already been chosen (for memory)
  const [pickedPokemon, setPickedPokemon] = useState([]);

  //Tally score
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  async function fetchPokemonList() {
    const pokemonAPI = "https://pokeapi.co/api/v2/pokemon/";
    const numberOfPokemons = difficultyLevels[difficulty];
    const pokemonUrls = Array.from(
      { length: numberOfPokemons },
      (_, index) => `${pokemonAPI}${index + 1}`
    );

    // Shuffle the URLs using Lodash
    const shuffledUrls = _.shuffle(pokemonUrls);

    try {
      const responses = await Promise.all(
        shuffledUrls.map((url) => fetch(url).then((res) => res.json()))
      );
      setPokemon(responses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemonList();
  }, [difficulty]);

  useEffect(() => {
    if (currentScore > bestScore[difficulty])
      setBestScore((prevInfo) => ({ ...prevInfo, [difficulty]: currentScore }));
  }, [currentScore, difficulty]);

  function resetPokemonList(id) {
    if (pickedPokemon.includes(id)) {
      restartGame();
    } else {
      setCurrentScore(currentScore + 1);
      setPickedPokemon((prevInfo) => [...prevInfo, id]);
    }
    fetchPokemonList();
  }

  function restartGame() {
    setGameStart(false);
    setCurrentScore(0);
  }

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (!gameStart) {
    return (
      <main>
        <img
          src="src\assets\title.png"
          alt="PokeMemory Game"
          className="game-title"
          onClick={restartGame}
        />
        <Score
          currentScore={currentScore}
          bestScore={bestScore}
          gameStart={gameStart}
          difficulty={difficulty}
        />
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
      </main>
    );
  } else {
    return (
      <main>
        <img
          src="src\assets\title.png"
          alt="PokeMemory Game"
          className="game-title"
          onClick={restartGame}
        />
        <Score
          currentScore={currentScore}
          bestScore={bestScore}
          gameStart={gameStart}
          difficulty={difficulty}
        />
        <PokemonList
          pokemon={pokemon}
          resetPokemonList={resetPokemonList}
          difficulty={difficulty}
        />
      </main>
    );
  }
}

export default App;
