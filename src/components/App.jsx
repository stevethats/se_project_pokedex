import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Header";
import Pokedex from "./Pokedex";
import About from "./About";

import {
  getPokemon,
  getPokemonSpecies,
  filterPokemonForCard,
  filterPokemonForDexEntry,
  filterPokemonClassification,
  filterPokemonEvoChain,
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

  const pushPokemonIntoArray = (data, array) => {
    array.push({
      chainNumber: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
    });
  };

  const fetchDexPokemon = async (pokemon, isCancelled) => {
    if (!isCancelled) {
      const pokemonSpeciesData = await getPokemonSpecies(pokemon.number);
      pokemon.entry = filterPokemonForDexEntry(pokemonSpeciesData);
      pokemon.classification = filterPokemonClassification(pokemonSpeciesData);

      let workingChain = [];

      await filterPokemonEvoChain(pokemonSpeciesData.evolution_chain.url).then(
        //still needs work for branch evolutions
        async (dataChain) => {
          if (dataChain.chain.species.name === pokemonSpeciesData.name) {
            workingChain.push({
              chainNumber: pokemon.number,
              name: pokemon.name,
              sprite: pokemon.sprite,
            });

            if (dataChain.chain.evolves_to[0]) {
              await getPokemon(dataChain.chain.evolves_to[0].species.name).then(
                (data) => {
                  pushPokemonIntoArray(data, workingChain);
                }
              );
            }

            if (dataChain.chain.evolves_to[0].evolves_to[0]) {
              await getPokemon(
                dataChain.chain.evolves_to[0].evolves_to[0].species.name
              ).then((data) => {
                pushPokemonIntoArray(data, workingChain);
              });
            }
          } else {
            await getPokemon(dataChain.chain.species.name).then((data) => {
              pushPokemonIntoArray(data, workingChain);
            });

            if (dataChain.chain.evolves_to[0]) {
              await getPokemon(dataChain.chain.evolves_to[0].species.name).then(
                (data) => {
                  pushPokemonIntoArray(data, workingChain);
                }
              );
            }

            if (dataChain.chain.evolves_to[0].evolves_to[0]) {
              await getPokemon(
                dataChain.chain.evolves_to[0].evolves_to[0].species.name
              ).then((data) => {
                pushPokemonIntoArray(data, workingChain);
              });
            }
          }
        }
      );

      pokemon.evoChain = workingChain;

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
