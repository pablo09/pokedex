import { PokemonDetails, PokemonOverview } from "../pages/pokemon-dashboard";
import { PokemonDescription } from "../pages/pokemon-details";

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

export function fetchPokemonByName(name: string): Promise<PokemonDetails> {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
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

function toPokemonDescription(pokemonSpeciesResponse: any): PokemonDescription {
  return {
    descriptionLines: pokemonSpeciesResponse.flavor_text_entries
      .filter((it: any) => it.language.name === "en")
      // eslint-disable-next-line no-control-regex
      .map((it: any) => it.flavor_text.replace(/[^\x00-\x7F]/g, "")),
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
