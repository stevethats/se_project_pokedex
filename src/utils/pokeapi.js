const baseUrl = "https://pokeapi.co/api/v2/";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function checkDataEmpty(data) {
  if (!data) {
    return null;
  }
}

function getPokemon(data) {
  return request(`${baseUrl}/pokemon/${data}`);
}

function getPokemonSpecies(number) {
  return request(`${baseUrl}/pokemon-species/${number}`);
}

function getPokemonEvolutionaryChain(url, number) {
  return request(!number ? url : `${baseUrl}/evolution-chain/${number}`);
}

function filterPokemonForCard(data) {
  checkDataEmpty(data);
  const pokemon = {};
  pokemon.number = data.id;
  pokemon.name = data.name;
  pokemon.sprite = data.sprites.front_default;
  pokemon.typePrimary = data.types[0].type.name;
  if (data.types[1] !== undefined) {
    pokemon.typeSecondary = data.types[1].type.name;
  }
  return pokemon;
}

function filterPokemonForDexEntry(data) {
  checkDataEmpty(data);
  const entryList = data.flavor_text_entries;
  let entry = "No data";
  entryList.forEach((listItem) => {
    if (listItem.language.name === "en" && listItem.version.name === "sword") {
      entry = listItem.flavor_text;
    }
  });
  if (entry === "No data") {
    entryList.forEach((listItem) => {
      if (listItem.language.name === "en") {
        entry = listItem.flavor_text;
      }
    });
  }
  const editedEntry = entry
    .replaceAll("\f", " ")
    .replaceAll("POKéMON", "Pokémon");
  return editedEntry;
}

function filterPokemonClassification(data) {
  checkDataEmpty(data);
  const classificationList = data.genera;
  let classification;
  classificationList.forEach((listItem) => {
    if (listItem.language.name === "en") {
      classification = listItem.genus;
    }
  });
  return classification;
}

const filterPokemonEvoChain = async (data) => {
  checkDataEmpty(data);
  const evoData = await getPokemonEvolutionaryChain(data);
  return evoData;
};

export {
  getPokemon,
  getPokemonSpecies,
  getPokemonEvolutionaryChain,
  filterPokemonForCard,
  filterPokemonForDexEntry,
  filterPokemonClassification,
  filterPokemonEvoChain,
};
