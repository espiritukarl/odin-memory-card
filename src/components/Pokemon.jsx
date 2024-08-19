export default function Pokemon({ poke, resetPokemonList }) {
  return (
    <article onClick={() => resetPokemonList(poke.id)}>
      <img src={poke.sprites.front_default} alt={poke.name} />
      <h4>{poke.name}</h4>
    </article>
  );
}
