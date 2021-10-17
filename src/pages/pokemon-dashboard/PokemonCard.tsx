import React from "react";
import { PokemonDetails, PokemonOverview } from "./index";
import { fetchPokemon } from "../../api/pokemon-api";

import styles from "./PokemonCard.module.css";

export interface PokemonCardProps {
  pokemon: PokemonOverview;
}

export const PokemonCard = (props: PokemonCardProps) => {
  const { pokemon } = props;

  const [pokemonDetails, setPokemonDetails] =
    React.useState<PokemonDetails | null>(null);

  React.useEffect(() => {
    fetchPokemon(pokemon.name).then(setPokemonDetails);
  }, [pokemon]);

  if (pokemonDetails == null) {
    return <></>;
  }

  return (
    <div className="col-md-2 mt-4">
      <div className={styles.pokemonCard}>
        <div className="m-4">
          <img
            className=""
            src={pokemonDetails.imageUrl}
            height="120 px"
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{pokemon.name}</h5>
            <p className="card-text">
              <p>Height: {pokemonDetails.height}</p>
              <p>Weight: {pokemonDetails.weight}</p>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};
