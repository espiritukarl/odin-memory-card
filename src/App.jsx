import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import PokemonList from "./components/PokemonList";
import _ from "lodash";

function App({}) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickedPokemon, setPickedPokemon] = useState([]);

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

  function resetPokemonList(id) {
    if (pickedPokemon.includes(id)) console.log("Already chosen");
    else setPickedPokemon((prevInfo) => [...prevInfo, id]);
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
      <PokemonList pokemon={pokemon} resetPokemonList={resetPokemonList} />
    </main>
  );
}

export default App;
