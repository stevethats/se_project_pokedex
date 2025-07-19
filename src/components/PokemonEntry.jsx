import PokemonEvolutionCard from "./PokemonEvolutionCard";
import "./PokemonEntry.css";

import TypeCard from "./TypeCard";

function PokemonEntry({ activePokemon, handleCardClick, captializeName }) {
  return (
    <section className="pokemon__entry">
      <span className="pokemon__entry-top-half">
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
          <h2 className="pokemon__classification">
            {activePokemon.classification}
          </h2>
          <p className="pokemon__pokedex-info">{activePokemon.entry}</p>
        </div>
      </span>
      <div className="pokemon__evolution">
        <h2 className="pokemon__evo-chain-title">Evolution Chain</h2>
        <span className="pokemon__evo-chain">
          {activePokemon.evoChain.map((obj, index) => (
            <PokemonEvolutionCard
              key={index}
              pokemon={obj}
              captializeName={captializeName}
            />
          ))}
        </span>
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
