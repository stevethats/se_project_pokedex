import "./PokemonEvolutionCard.css";

import TypeCard from "./TypeCard";

function PokemonEvolutionCard({ pokemon, captializeName }) {
  return (
    <section className="pokemon__evo-card">
      <img
        src={pokemon.sprite}
        alt={"pokemon " + pokemon.number}
        className="pokemon__evo-image"
      />
      <p className="pokemon__evo-name">{captializeName(pokemon.name)}</p>
    </section>
  );
}

export default PokemonEvolutionCard;
