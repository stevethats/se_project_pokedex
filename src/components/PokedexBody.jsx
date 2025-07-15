import React from "react";

import "./PokedexBody.css";
import PokemonCard from "./PokemonCard";

import { getPokemon, filterPokemonForCard } from "../utils/pokeapi";
import PokemonContext from "../contexts/PokemonContext";
import PokemonEntry from "./PokemonEntry";

function PokedexBody({ handleShowMore, handleCardClick }) {
  const { pokemonList, captializeName, popUpVisible, activePokemon } =
    React.useContext(PokemonContext);

  return (
    <section className="pokedex__body">
      <div className="pokedex__screen-background">
        <div className="pokedex__screen">
          {popUpVisible ? (
            <PokemonEntry
              activePokemon={activePokemon}
              captializeName={captializeName}
              handleCardClick={handleCardClick}
            />
          ) : (
            <div className="pokedex__pokemon-list">
              {pokemonList.map((obj, index) => (
                <PokemonCard
                  key={index}
                  pokemon={obj}
                  captializeName={captializeName}
                  handleCardClick={handleCardClick}
                />
              ))}
              <button
                className="pokedex__show-more-button"
                type="button"
                onClick={handleShowMore}
              >
                Show more
              </button>
            </div>
          )}
        </div>
        <div className="pokedex__screen-red-light-rim"></div>
        <div className="pokedex__screen-red-light"></div>
      </div>
      <span className="pokedex__decor-buttons">
        <div className="pokedex__black-button-rim"></div>
        <div className="pokedex__black-button"></div>
        <div className="pokedex__red-button-rim"></div>
        <div className="pokedex__red-button"></div>
        <div className="pokedex__blue-button-rim"></div>
        <div className="pokedex__blue-button"></div>
        <div className="pokedex__green-screen"></div>
        <div className="pokedex__dpad-horizontal-back"></div>
        <div className="pokedex__dpad-vertical-back"></div>
        <div className="pokedex__dpad-horizontal"></div>
        <div className="pokedex__dpad-vertical"></div>
      </span>
    </section>
  );
}

export default PokedexBody;
