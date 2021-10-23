import { PokemonDetails, PokemonOverview } from "../pages/pokemon-dashboard";
import { PokemonDescription } from "../pages/pokemon-details";
import { LoggedUser } from "../context/security-context";
import { PokemonCollection } from "../pages/my-collection";

export function fetchPokemons(
  offset: number,
  limit: number
): Promise<PokemonOverview[]> {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  )
    .then((response) => response.json())
    .then(toPokemonList);
}

export function fetchPokemonById(id: string): Promise<PokemonDetails> {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then(toPokemonDetails);
}

export function fetchPokemonDescriptions(
  id: string
): Promise<PokemonDescription> {
  return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((response) => response.json())
    .then(toPokemonDescription);
}

export function addPokemonToCollection(
  user: LoggedUser,
  pokemonId: string
): Promise<any> {
  const myCollectionStorageKey = `user-${user.username}`;
  const collection = window.localStorage.getItem(myCollectionStorageKey);
  if (!collection) {
    window.localStorage.setItem(
      myCollectionStorageKey,
      JSON.stringify([pokemonId])
    );
  } else {
    const collectionObject = JSON.parse(collection);
    collectionObject.push(pokemonId);
    window.localStorage.setItem(
      myCollectionStorageKey,
      JSON.stringify(collectionObject)
    );
  }

  return new Promise<any>((resolve) => resolve({}));
}

export function fetchMyCollection(
  user: LoggedUser
): Promise<PokemonCollection> {
  const myCollectionStorageKey = `user-${user.username}`;
  const collection = window.localStorage.getItem(myCollectionStorageKey);
  if (!collection) {
    return new Promise((resolve) => resolve({ ids: [] }));
  }

  return new Promise((resolve) =>
    resolve({ ids: JSON.parse(collection) })
  );
}

function toPokemonDescription(pokemonSpeciesResponse: any): PokemonDescription {
  return {
    descriptionLines: pokemonSpeciesResponse.flavor_text_entries
      .filter((it: any) => it.language.name === "en")
      // eslint-disable-next-line no-control-regex
      .map((it: any) => decodeURIComponent(it.flavor_text)),
  };
}

function toPokemonList(pokemonListResponse: any): PokemonOverview[] {
  return pokemonListResponse.results.map((it: any) => ({
    id: findPokemonId(it.url),
    name: it.name,
  }));
}

function toPokemonDetails(pokemonDetailsResponse: any): PokemonDetails {
  return {
    id: pokemonDetailsResponse.id,
    name: pokemonDetailsResponse.name,
    defaultFrontImageUrl: pokemonDetailsResponse.sprites.front_default,
    defaultBackImageUrl: pokemonDetailsResponse.sprites.back_default,
    officialArtworkImageUrl:
      pokemonDetailsResponse.sprites.other["official-artwork"].front_default,
    height: pokemonDetailsResponse.height,
    weight: pokemonDetailsResponse.weight,
    type: pokemonDetailsResponse.types[0].type.name,
  };
}

function findPokemonId(url: string) {
  const matchingResult = new RegExp(/^(.*)\/pokemon\/([0-9]+)\/$/g).exec(url);
  if (!!matchingResult && matchingResult.length > 2) {
    return matchingResult[2];
  }
  return null;
}
