import { NamedAPIResourceList, NamedAPIResource, Region, Pokedex, PokemonEntry } from 'pokenode-ts'
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import axios, { AxiosResponse } from 'axios';

export interface Regions extends NamedAPIResource {
  id: string
}

type GetPokemonResponse = {
  count: number;
  regions: Regions[];
}

export async function getAllRegion(): Promise<GetPokemonResponse> {
  const { data } = await api.get<NamedAPIResourceList>('region');

  const regions: Regions[] = data.results.map((pokemon: any) => {
    return {
      name: pokemon.name,
      url: pokemon.url,
      id: pokemon.url.split('/')[pokemon.url.split('/').length - 2],
    }
  });

  return {
    count: data.count,
    regions: regions
  };
}

export async function getRegionById(regionId: string): Promise<Region> {
  let endpoints = [];
  const response = await api.get<Region>(`region/${regionId}`);

  const pokedexIds = response.data.pokedexes.map((pokedex: any) => {
    return {
      pokedexId: pokedex.url.split('/')[pokedex.url.split('/').length - 2],
    }
  });
  
  for(let i = 0; i < pokedexIds.length; i++) {
    endpoints.push(`pokedex/${pokedexIds[i].pokedexId}`)
  }

  const requests = endpoints.map(endpoint => api.get(endpoint));
  const responses: AxiosResponse<Pokedex>[]  = await axios.all(requests);

  const pokedex = axios.spread<AxiosResponse<Pokedex>, Pokedex[]>((...responses) => {
    return responses.map(response => response.data);
  })(responses);

  const pokemonSpecies: NamedAPIResource[] = pokedex.reduce((acc: NamedAPIResource[], item: Pokedex) => {
    return acc.concat(item.pokemon_entries.map(entry => entry.pokemon_species).filter(species => {
      return !acc.find(obj => obj.name === species.name);
    }));
  }, []);
  
  return response.data;
}

export function useAllRegionQuery() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: getAllRegion,
    staleTime: 1000 * 60 * 60, 
  });
}

export function useRegionByIdQuery(regionId: string) {
  return useQuery({
    queryKey: ["region", regionId],
    queryFn: () => getRegionById(regionId),
    staleTime: 1000 * 60 * 60, 
  });
}