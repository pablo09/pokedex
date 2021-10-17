import React from "react";
import { useRouteMatch } from "react-router-dom";
import { PokemonDetails } from "../pokemon-dashboard";
import {
  fetchPokemonByName,
  fetchPokemonDescriptions,
} from "../../api/pokemon-api";
import { PokemonDescription, toPokemonTypeBadge } from "./index";

interface RouteParams {
  pokemonId: string;
}

export const PokemonDetailsPage = () => {
  const {
    params: { pokemonId },
  } = useRouteMatch<RouteParams>();
  const [pokemonDetails, setPokemonDetails] =
    React.useState<PokemonDetails | null>(null);
  const [pokemonDescription, setPokemonDescription] =
    React.useState<PokemonDescription | null>(null);

  React.useEffect(() => {
    fetchPokemonByName(pokemonId).then(setPokemonDetails);
    fetchPokemonDescriptions(pokemonId).then(setPokemonDescription);
  }, [pokemonId]);

  if (!pokemonDetails) {
    return <></>;
  }

  return (
    <div className="row">
      <div className="col-md-7">
        <img
          className="img-fluid"
          src={pokemonDetails!.officialArtworkImageUrl}
          alt=""
        />
      </div>
      <div className="col-md-5">
        <h3 className="my-3">{pokemonDetails!.name}</h3>
        <span
          className={["badge", toPokemonTypeBadge(pokemonDetails.type)].join(
            " "
          )}
        >
          {pokemonDetails.type}
        </span>
        <hr />
        {pokemonDescription && (
          <ul>
            {[...new Set(pokemonDescription.descriptionLines)]
              .slice(0, 5)
              .map((descriptionLine) => (
                <li>{descriptionLine}</li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};
