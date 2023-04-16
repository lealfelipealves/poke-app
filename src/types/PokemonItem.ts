import { NamedAPIResource, NamedAPIResourceList } from "pokenode-ts";

export interface NamedAPIResourceWithId extends NamedAPIResource {
  id: number;
}

export interface NamedAPIResourceListWithId extends NamedAPIResourceList {
  results: NamedAPIResourceWithId[];
}