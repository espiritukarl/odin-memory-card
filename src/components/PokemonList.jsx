// import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

function PokemonList({ pokemon, resetPokemonList }) {
  return (
    <>
      <h1>Pokemon List</h1>
      <section>
        {pokemon.map((poke) => (
          <Pokemon
            key={poke.id}
            poke={poke}
            resetPokemonList={resetPokemonList}
          />
        ))}
      </section>
    </>
  );
}

export default PokemonList;
