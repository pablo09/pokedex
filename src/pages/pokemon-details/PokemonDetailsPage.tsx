import React from "react";
import { useRouteMatch } from "react-router-dom";
import { PokemonDetails } from "../pokemon-dashboard";
import {
  addPokemonToCollection,
  fetchPokemonById,
  fetchPokemonDescriptions,
} from "../../api/pokemon-api";
import { PokemonDescription, toPokemonTypeBadge } from "./index";
import { SecurityContext } from "../../context/security-context";
import { toast } from "react-toastify";

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

  const { loggedUser, isAuthenticated } = React.useContext(SecurityContext);

  React.useEffect(() => {
    fetchPokemonById(pokemonId).then(setPokemonDetails);
    fetchPokemonDescriptions(pokemonId).then(setPokemonDescription);
  }, [pokemonId]);

  if (!pokemonDetails) {
    return <></>;
  }

  function addToCollection() {
    if (loggedUser) {
      addPokemonToCollection(loggedUser, pokemonId)
        .then(() => toast.success("Pokemon added to collection!"))
        .catch((error) => toast.error(error));
    }
  }

  return (
    <div className="row">
      <div className="col-md-7">
        <img
          className="img-fluid"
          src={pokemonDetails.officialArtworkImageUrl}
          alt=""
        />
      </div>
      <div className="col-md-5">
        <div className="d-flex align-items-baseline justify-content-between">
          <h3 className="my-3">{pokemonDetails.name}</h3>
          {isAuthenticated() && (
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={addToCollection}
            >
              Add to collection
            </button>
          )}
        </div>
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
