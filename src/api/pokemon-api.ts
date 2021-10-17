import { PokemonDetails, PokemonOverview } from "../pages/pokemon-dashboard";

export function fetchPokemons(offset: number, limit: number): Promise<PokemonOverview[]> {
  return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then(toPokemonList);
}

export function fetchPokemon(name: string): Promise<PokemonDetails> {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then(toPokemonDetails);
}

function toPokemonList(pokemonListResponse: any): PokemonOverview[] {
  return pokemonListResponse.results.map((it: any) => ({
    name: it.name,
  }));
}

function toPokemonDetails(pokemonDetailsResponse: any): PokemonDetails {
  return {
    name: pokemonDetailsResponse.name,
    imageUrl: pokemonDetailsResponse.sprites.front_default,
    height: pokemonDetailsResponse.height,
    weight: pokemonDetailsResponse.weight
  };
}
