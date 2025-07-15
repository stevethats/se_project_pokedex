import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Header";
import Pokedex from "./Pokedex";
import About from "./About";

import {
  getPokemon,
  getPokemonSpecies,
  getPokemonEvolutionaryChain,
  filterPokemonForCard,
  filterPokemonForDexEntry,
} from "../utils/pokeapi";

import PokemonContext from "../contexts/PokemonContext";

import useAsyncWithCleanup from "../hooks/useAsyncWithCleanup";

function App() {
  const [counter, setCounter] = React.useState(472);
  const [pokemonList, setPokemonList] = React.useState([]);
  const [popUpVisible, setPopUpVisible] = React.useState(false);
  const [activePokemon, setActivePokemon] = React.useState({});

  const captializeName = (name) => {
    let fullName = "";

    if (name.includes("-")) {
      const splitString = name.split("-");

      splitString.forEach((namePart) => {
        fullName =
          fullName + namePart.charAt(0).toUpperCase() + namePart.slice(1) + " ";
      });

      return fullName;
    } else {
      return (fullName = name.charAt(0).toUpperCase() + name.slice(1));
    }
  };

  const handleCardClick = async (pokemon) => {
    popUpVisible
      ? setPopUpVisible(false)
      : (await fetchDexPokemon(pokemon)) & setPopUpVisible(true);
  };

  const fetchScreenPokemon = async (start, finish, isCancelled) => {
    for (let i = start; i < finish; i++) {
      const pokemon = await getPokemon(i);
      if (!isCancelled) {
        setPokemonList((pokemonList) => [
          ...pokemonList,
          filterPokemonForCard(pokemon),
        ]);
      }
    }
    setCounter(finish);
  };

  const fetchDexPokemon = async (pokemon, isCancelled) => {
    if (!isCancelled) {
      const pokemonSpeciesData = await getPokemonSpecies(pokemon.number);
      pokemon.entry = filterPokemonForDexEntry(pokemonSpeciesData);
      // console.log(pokemon);
      setActivePokemon(pokemon);
    }
  };

  const { loading, executeAsync } = useAsyncWithCleanup(fetchScreenPokemon);

  const handleShowMore = () => {
    executeAsync(counter, counter + 15);
  };

  let isCancelled = false;

  React.useEffect(() => {
    executeAsync(1, 16, isCancelled);

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <PokemonContext.Provider
        value={{
          pokemonList,
          setPokemonList,
          counter,
          captializeName,
          popUpVisible,
          setPopUpVisible,
          activePokemon,
        }}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Pokedex
                handleShowMore={handleShowMore}
                handleCardClick={handleCardClick}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </PokemonContext.Provider>
    </>
  );
}

export default App;
