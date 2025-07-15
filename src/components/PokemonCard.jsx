import "./PokemonCard.css";

import TypeCard from "./TypeCard";

function PokemonCard({ pokemon, captializeName, handleCardClick }) {
  const handleClick = () => {
    handleCardClick(pokemon);
  };

  return (
    <section className="pokemon__card" onClick={handleClick}>
      <img
        src={pokemon.sprite}
        alt={"pokemon " + pokemon.number}
        className="pokemon__image"
      />
      <h2 className="pokemon__name">{captializeName(pokemon.name)}</h2>
      <TypeCard pokemon={pokemon} />
    </section>
  );
}

export default PokemonCard;
