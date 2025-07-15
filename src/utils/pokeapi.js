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

function getPokemon(number) {
  return request(`${baseUrl}/pokemon/${number}`);
}

function getPokemonSpecies(number) {
  return request(`${baseUrl}/pokemon-species/${number}`);
}

function getPokemonEvolutionaryChain(url, number) {
  return request(!number ? url : `${baseUrl}/evolution-chain/${number}`);
}

function filterPokemonForCard(data) {
  if (!data) {
    return null;
  }
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
  if (!data) {
    return null;
  }
  const entry = data.flavor_text_entries[0].flavor_text;
  const editedEntry = entry
    .replaceAll("\f", " ")
    .replaceAll("POKéMON", "Pokémon");
  return editedEntry;
}

export {
  getPokemon,
  getPokemonSpecies,
  getPokemonEvolutionaryChain,
  filterPokemonForCard,
  filterPokemonForDexEntry,
};
