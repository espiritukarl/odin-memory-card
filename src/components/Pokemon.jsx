import { useState } from "react";

export default function Pokemon({ poke, resetPokemonList }) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <article className="pokemon">
      <div
        className="pokemon-card"
        onClick={() => resetPokemonList(poke.id)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="image-container">
          <img
            src={poke.sprites.front_default}
            alt={poke.name}
            className={`pokemon-img ${isHovered ? "fade-out" : "fade-in"}`}
          />
          <img
            src={poke.sprites.other["showdown"].front_default}
            alt={poke.name}
            className={`pokemon-img ${isHovered ? "fade-in" : "fade-out"}`}
          />
        </div>
        <h4>{poke.name}</h4>
      </div>
    </article>
  );
}
