import Pokemon from "./Pokemon";

function PokemonList({ pokemon, resetPokemonList, difficulty }) {
  return (
    <>
      <section className={`pokemon-list ${difficulty}`}>
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
