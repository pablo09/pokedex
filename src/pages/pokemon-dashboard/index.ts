export interface PokemonOverview {
    id: string;
    name: string;
}

export interface PokemonDetails {
    id: string;
    name: string;
    defaultFrontImageUrl: string;
    defaultBackImageUrl: string;
    officialArtworkImageUrl: string;
    height: number;
    weight: number;
    type: PokemonType;
}

export enum PokemonType {
    NORMAL = 'normal',
    FIGHTING = 'fighting',
    FLYING = 'flying',
    POISON = 'poison',
    GROUND = 'ground',
    ROCK = 'rock',
    BUG = 'bug',
    GHOST = 'ghost',
    STEEL = 'steel',
    FIRE = 'fire',
    WATER = 'water',
    GRASS = 'grass',
    ELECTRIC = 'electric',
    PSYCHIC = 'psychic',
    ICE = 'ice',
    DRAGON = 'dragon',
    DARK = 'dark',
    FAIRY = 'fairy',
    UNKNOWN = 'unknown',
    SHADOW = 'shadow'
}