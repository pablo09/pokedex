import React from "react";
import { SecurityContext } from "../../context/security-context";
import { PokemonCollection, PokemonCollectionElement } from "./index";
import { fetchMyCollection, fetchPokemonById } from "../../api/pokemon-api";

export const MyCollectionPage = () => {
  const { loggedUser } = React.useContext(SecurityContext);

  const [pokemonCollectionElements, setPokemonCollectionElements] =
    React.useState<PokemonCollectionElement[]>([]);

  React.useEffect(() => {
    if (loggedUser) {
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
    }
  }, [loggedUser]);

  return (
    <div className="row">
      {pokemonCollectionElements.map((pokemonCollectionElement) => (
        <div className="col-sm-4" key={pokemonCollectionElement.id}>
          <img width="60%" src={pokemonCollectionElement.imageUrl} />
          <h4>{pokemonCollectionElement.name}</h4>
        </div>
      ))}
    </div>
  );
};
