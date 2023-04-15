import { NamedAPIResource, NamedAPIResourceList } from "pokenode-ts";

export interface PokemonItem extends NamedAPIResource {
  id: string;
}

export interface PokemonList extends NamedAPIResourceList {
  results: PokemonItem[];
}