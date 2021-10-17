import React from "react";
import { PokemonOverview } from "./index";
import { fetchPokemon, fetchPokemons } from "../../api/pokemon-api";
import { PokemonCard } from "./PokemonCard";
import { PokemonSearchPanel } from "./PokemonSearchPanel";

const POKEMON_PAGE_SIZE = 100;

export const PokemonDashboardPage = () => {
  const [pokemons, setPokemons] = React.useState<PokemonOverview[]>([]);
  const [isShowMoreLoading, setShowMoreLoading] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    fetchPokemons(0, POKEMON_PAGE_SIZE).then(setPokemons);
  }, []);

  function handleShowMoreClick() {
    setShowMoreLoading(true);
    fetchPokemons(pokemons.length, POKEMON_PAGE_SIZE)
      .then((newPokemons) => setPokemons(pokemons.concat(newPokemons)))
      .finally(() => setShowMoreLoading(false));
  }

  function handleSearchClick(name: string) {
    if (!name.trim()) {
      fetchPokemons(0, POKEMON_PAGE_SIZE)
        .then(setPokemons)
        .catch(() => setPokemons([]));
    } else {
      fetchPokemon(name)
        .then((pokeomon) => setPokemons([{ name: pokeomon.name }]))
        .catch(() => setPokemons([]));
    }
  }

  return (
    <>
      <PokemonSearchPanel onPokemonSearchClick={handleSearchClick} />
      <div className="row">
        {pokemons.map((it) => (
          <PokemonCard key={it.name} pokemon={it} />
        ))}
      </div>
      <div className="row d-flex justify-content-center m-2">
        {pokemons.length >= POKEMON_PAGE_SIZE && (
          <button
            className="col-sm-2 btn btn-info"
            disabled={isShowMoreLoading}
            onClick={handleShowMoreClick}
          >
            {isShowMoreLoading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            &nbsp;Show more
          </button>
        )}
      </div>
    </>
  );
};
