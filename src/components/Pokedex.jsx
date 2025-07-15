import "./Pokedex.css";
import PokedexBody from "./PokedexBody";
import PokedexHeader from "./PokedexHeader";

function Pokedex({ handleShowMore, handleCardClick }) {
  return (
    <main className="pokedex">
      <PokedexHeader />
      <PokedexBody
        handleShowMore={handleShowMore}
        handleCardClick={handleCardClick}
      />
    </main>
  );
}

export default Pokedex;
