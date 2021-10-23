import React from "react";
import { SecurityContext } from "../../context/security-context";
import { PokemonCollectionElement } from "./index";
import {
  fetchMyCollection,
  fetchPokemonById,
  removePokemonFromCollection,
} from "../../api/pokemon-api";
import { toast } from "react-toastify";

export const MyCollectionPage = () => {
  const { loggedUser } = React.useContext(SecurityContext);

  const [pokemonCollectionElements, setPokemonCollectionElements] =
    React.useState<PokemonCollectionElement[]>([]);

  React.useEffect(() => {
    if (!loggedUser) {
      return;
    }

    fetchMyCollection(loggedUser).then((pokemonCollection) => {
      pokemonCollection.ids.forEach((it) => {
        fetchPokemonById(it).then((pokemonDetails) =>
          setPokemonCollectionElements((prevArray) => [
            ...prevArray,
            {
              id: pokemonDetails.id,
              imageUrl: pokemonDetails.officialArtworkImageUrl,
              name: pokemonDetails.name,
            },
          ])
        );
      });
    });
  }, [loggedUser]);

  const handleRemoveFromCollection = (
    pokemonCollectionElement: PokemonCollectionElement
  ) => {
    if (!loggedUser) {
      return;
    }
    removePokemonFromCollection(loggedUser, pokemonCollectionElement.id).then(
      () => {
        setPokemonCollectionElements(
          pokemonCollectionElements.filter(
            (it) => it.id !== pokemonCollectionElement.id
          )
        );
        toast.success("Pokemon removed from collection");
      }
    );
  };

  return (
    <div className="row">
      {pokemonCollectionElements.length === 0 && (
        <p className="text-center">No pokemons in collection</p>
      )}
      {pokemonCollectionElements.map((pokemonCollectionElement) => (
        <div className="col-sm-3" key={pokemonCollectionElement.id}>
          <div
            style={{ cursor: "pointer" }}
            className="float-end"
            onClick={() => handleRemoveFromCollection(pokemonCollectionElement)}
          >
            <i className="text-danger fas fa-times fa-2x"></i>
          </div>
          <div className="m-4">
            <img width="60%" src={pokemonCollectionElement.imageUrl} alt=""/>
            <h4>{pokemonCollectionElement.name}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};
