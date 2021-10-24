import React from "react";
import { PokemonDetails, PokemonOverview } from "./index";
import { fetchPokemonById } from "../../api/pokemon-api";

import styles from "./PokemonCard.module.css";
import { Link } from "react-router-dom";

export interface PokemonCardProps {
  pokemon: PokemonOverview;
}

export const PokemonCard = (props: PokemonCardProps) => {
  const { pokemon } = props;

  const [pokemonDetails, setPokemonDetails] =
    React.useState<PokemonDetails | null>(null);

  React.useEffect(() => {
    fetchPokemonById(pokemon.name).then(setPokemonDetails);
  }, [pokemon]);

  if (pokemonDetails == null) {
    return <></>;
  }

  return (
    <div className="col-sm-2 mt-4">
      <div className={styles.pokemonCard}>
        <div className="m-4">
          <Link to={`/pokemon-details/${pokemon.id}`}>
            <img
              className=""
              src={pokemonDetails.defaultFrontImageUrl}
              height="120 px"
              alt=""
            />
          </Link>
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
