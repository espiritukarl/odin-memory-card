import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import PokemonList from "./components/PokemonList";
import GameMenu from "./components/GameMenu";
import Score from "./components/Score";
import Modal from "./components/Modal";
import _ from "lodash";
import "./styles/App.css";
import Title from "./components/Title";

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
  const [pokemonList, setPokemonList] = useState([]);
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

  //Game Over screen
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  async function fetchPokemonList() {
    const pokemonAPI = "https://pokeapi.co/api/v2/pokemon/";
    const numberOfPokemons = difficultyLevels[difficulty];

    const pokemonUrls = [];
    const usedIds = new Set();

    while (pokemonUrls.length < numberOfPokemons) {
      const randomId = Math.floor(Math.random() * 50) + 1;

      // Check if the ID is already used
      if (!usedIds.has(randomId)) {
        usedIds.add(randomId); // Add the ID to the set
        pokemonUrls.push(`${pokemonAPI}${randomId}`);
      }
    }

    setPokemonList(pokemonUrls);
  }

  async function randomizePokemonList() {
    // Shuffle the URLs using Lodash
    const shuffledUrls = _.shuffle(pokemonList);

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
  }, [gameStart, difficulty]);

  useEffect(() => {
    if (pokemonList.length > 0) {
      randomizePokemonList();
    }
  }, [pokemonList]);

  useEffect(() => {
    if (currentScore > bestScore[difficulty]) {
      setBestScore((prevInfo) => ({ ...prevInfo, [difficulty]: currentScore }));
    }
    if (currentScore === difficultyLevels[difficulty]) {
      setIsModalOpen(true);
      setModalContent(
        <>
          <h1>Congratulations!</h1>
          <p>You have beaten the game. Score: {difficultyLevels[difficulty]}</p>
          <p>Do you want to play again?</p>
        </>
      );
      setCurrentScore(0);
      setPickedPokemon([]);
    }
  }, [currentScore, difficulty]);

  function resetPokemonList(id) {
    if (pickedPokemon.includes(id)) {
      setIsModalOpen(true);
      setModalContent(
        <>
          <h1>Game Over!</h1>
          <p>You scored: {currentScore} </p>
          <p>Do you want to play again?</p>
        </>
      );
      setCurrentScore(0);
      setPickedPokemon([]);
    } else {
      setCurrentScore(currentScore + 1);
      setPickedPokemon((prevInfo) => [...prevInfo, id]);
    }
    randomizePokemonList();
  }

  function restartGame() {
    setGameStart(false);
    setCurrentScore(0);
    setPickedPokemon([]);
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
        <Title restartGame={restartGame} />
        <Score
          currentScore={currentScore}
          bestScore={bestScore}
          gameStart={gameStart}
          difficulty={difficulty}
        />
        <GameMenu
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setGameStart={setGameStart}
        />
      </main>
    );
  } else {
    return (
      <main>
        <Title restartGame={restartGame} />
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
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={modalContent}
          restart={restartGame}
        />
      </main>
    );
  }
}

export default App;
