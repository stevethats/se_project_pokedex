import "./TypeCard.css";
import water from "../assets/pokemonTypes/water.png";
import steel from "../assets/pokemonTypes/steel.png";
import rock from "../assets/pokemonTypes/rock.png";
import psychic from "../assets/pokemonTypes/psychic.png";
import poison from "../assets/pokemonTypes/poison.png";
import normal from "../assets/pokemonTypes/normal.png";
import ice from "../assets/pokemonTypes/ice.png";
import ground from "../assets/pokemonTypes/ground.png";
import grass from "../assets/pokemonTypes/grass.png";
import ghost from "../assets/pokemonTypes/ghost.png";
import flying from "../assets/pokemonTypes/flying.png";
import fire from "../assets/pokemonTypes/fire.png";
import fighting from "../assets/pokemonTypes/fighting.png";
import fairy from "../assets/pokemonTypes/fairy.png";
import electric from "../assets/pokemonTypes/electric.png";
import dragon from "../assets/pokemonTypes/dragon.png";
import dark from "../assets/pokemonTypes/dark.png";
import bug from "../assets/pokemonTypes/bug.png";

function TypeCard({ pokemon }) {
  const checkType = (type) => {
    if (type === "water") {
      return water;
    }
    if (type === "steel") {
      return steel;
    }
    if (type === "rock") {
      return rock;
    }
    if (type === "psychic") {
      return psychic;
    }
    if (type === "poison") {
      return poison;
    }
    if (type === "normal") {
      return normal;
    }
    if (type === "ice") {
      return ice;
    }
    if (type === "ground") {
      return ground;
    }
    if (type === "grass") {
      return grass;
    }
    if (type === "ghost") {
      return ghost;
    }
    if (type === "flying") {
      return flying;
    }
    if (type === "fire") {
      return fire;
    }
    if (type === "fighting") {
      return fighting;
    }
    if (type === "fairy") {
      return fairy;
    }
    if (type === "electric") {
      return electric;
    }
    if (type === "dragon") {
      return dragon;
    }
    if (type === "dark") {
      return dark;
    }
    if (type === "bug") {
      return bug;
    }
  };

  const primaryType = checkType(pokemon.typePrimary);
  const secondaryType = checkType(pokemon.typeSecondary);

  if (pokemon.typeSecondary) {
    return (
      <div className="pokemon__type-container">
        <img
          src={primaryType}
          alt={pokemon.typePrimary}
          className="pokemon__type pokemon__type_primary"
        />
        <img
          src={secondaryType}
          alt={pokemon.typeSecondary}
          className="pokemon__type pokemon__type_secondary"
        />
      </div>
    );
  } else {
    return (
      <div className="pokemon__type-container">
        <img
          src={primaryType}
          alt={pokemon.typePrimary}
          className="pokemon__type pokemon__type_primary"
        />
      </div>
    );
  }
}

export default TypeCard;
