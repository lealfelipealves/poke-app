import { NamedAPIResource, NamedAPIResourceList } from "pokenode-ts";

export interface PokemonItem extends NamedAPIResource {
  id: number;
}

export interface PokemonList extends NamedAPIResourceList {
  results: PokemonItem[];
}