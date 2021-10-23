import React from "react";
import { PokemonOverview } from "./index";
import { fetchPokemonById, fetchPokemons } from "../../api/pokemon-api";
import { PokemonCard } from "./PokemonCard";
import { PokemonSearchPanel } from "./PokemonSearchPanel";
import { OverlaySpinner } from "../../components/overlay-spinner/OverlaySpinner";

const POKEMON_PAGE_SIZE = 100;

export const PokemonDashboardPage = () => {
  const [pokemons, setPokemons] = React.useState<PokemonOverview[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isShowMoreLoading, setShowMoreLoading] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    fetchPokemons(0, POKEMON_PAGE_SIZE)
      .then(setPokemons)
      .finally(() => setLoading(false));
  }, []);

  function handleShowMoreClick() {
    setShowMoreLoading(true);
    fetchPokemons(pokemons.length, POKEMON_PAGE_SIZE)
      .then((newPokemons) => setPokemons(pokemons.concat(newPokemons)))
      .finally(() => setShowMoreLoading(false));
  }

  function handleSearchClick(name: string) {
    setLoading(true);
    if (!name.trim()) {
      fetchPokemons(0, POKEMON_PAGE_SIZE)
        .then(setPokemons)
        .catch(() => setPokemons([]))
        .finally(() => setLoading(false));
    } else {
      fetchPokemonById(name)
        .then((pokemon) =>
          setPokemons([{ name: pokemon.name, id: pokemon.id }])
        )
        .catch(() => setPokemons([]))
        .finally(() => setLoading(false));
    }
  }

  return (
    <>
      <OverlaySpinner opened={isLoading} />
      <PokemonSearchPanel onPokemonSearchClick={handleSearchClick} />
      <div className="row">
        {pokemons.length === 0 && <NoItemsRow />}
        {pokemons.map((it) => (
          <PokemonCard key={it.name} pokemon={it} />
        ))}
      </div>
      <ShowMoreButton
        itemsCount={pokemons.length}
        isLoading={isLoading}
        isShowMoreLoading={isShowMoreLoading}
        handleShowMoreClick={handleShowMoreClick}
      />
    </>
  );
};

interface ShowMoreButtonProps {
  itemsCount: number;
  isLoading: boolean;
  isShowMoreLoading: boolean;
  handleShowMoreClick(): void;
}

const NoItemsRow = () => <div className="text-center m-5">No items found</div>;

const ShowMoreButton = (props: ShowMoreButtonProps) => {
  if (props.isLoading) {
    return <></>;
  }
  return (
    <div className="row d-flex justify-content-center m-2">
      {props.itemsCount >= POKEMON_PAGE_SIZE && (
        <button
          className="col-sm-2 btn btn-info"
          disabled={props.isShowMoreLoading}
          onClick={props.handleShowMoreClick}
        >
          {props.isShowMoreLoading && (
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
  );
};
