import "./PokemonEntry.css";

import TypeCard from "./TypeCard";

function PokemonEntry({ activePokemon, handleCardClick, captializeName }) {
  return (
    <section className="pokemon__entry">
      <img
        src={activePokemon.sprite}
        alt={"pokemon " + activePokemon.number}
        className="pokemon__entry-image"
      />
      <div className="pokemon__entry-info">
        <span className="pokemon__name-and-type">
          <TypeCard pokemon={activePokemon} />
          <h2 className="pokemon__entry-name">
            {captializeName(activePokemon.name)}
          </h2>
        </span>
        <p className="pokemon__pokedex-info">{activePokemon.entry}</p>
      </div>
      <button
        type="button"
        className="pokemon__close"
        onClick={handleCardClick}
      >
        X
      </button>
    </section>
  );
}

export default PokemonEntry;
