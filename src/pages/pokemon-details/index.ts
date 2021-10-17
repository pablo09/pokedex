import { PokemonType } from "../pokemon-dashboard";

export interface PokemonDescription {
  descriptionLines: string[];
}

export function toPokemonTypeBadge(pokemonType: PokemonType) {
  switch (pokemonType) {
    case PokemonType.ICE:
    case PokemonType.STEEL:
      return "bg-info";
    case PokemonType.WATER:
    case PokemonType.ELECTRIC:
    case PokemonType.FLYING:
      return "bg-primary";
    case PokemonType.FIRE:
    case PokemonType.DRAGON:
    case PokemonType.UNKNOWN:
      return "bg-danger";
    case PokemonType.GROUND:
    case PokemonType.BUG:
    case PokemonType.FIGHTING:
      return "bg-secondary";
    case PokemonType.FAIRY:
      return "bg-warning";
    case PokemonType.GRASS:
      return "bg-success";
    default:
      return "bg-light";
  }
}
