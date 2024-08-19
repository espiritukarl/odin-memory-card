import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import PokemonList from "./components/PokemonList";
import Score from "./components/Score";
import _ from "lodash";

function App({}) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickedPokemon, setPickedPokemon] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  async function fetchPokemonList() {
    const pokemonAPI = "https://pokeapi.co/api/v2/pokemon/";
    const pokemonUrls = Array.from(
      { length: 20 },
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
  }, []);

  useEffect(() => {
    if (currentScore > bestScore) setBestScore(currentScore);
  }, [currentScore]);

  function resetPokemonList(id) {
    if (pickedPokemon.includes(id)) {
      setCurrentScore(0);
      console.log("Already chosen");
    } else {
      setCurrentScore(currentScore + 1);
      setPickedPokemon((prevInfo) => [...prevInfo, id]);
    }
    fetchPokemonList();
  }

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <main>
      <Score currentScore={currentScore} bestScore={bestScore} />
      <PokemonList pokemon={pokemon} resetPokemonList={resetPokemonList} />
    </main>
  );
}

export default App;
