import axios, { AxiosResponse } from 'axios';
import { Region, Pokedex, NamedAPIResource } from 'pokenode-ts'
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { NamedAPIResourceWithId } from '@/types';

export async function getRegionByName(regionName: string): Promise<NamedAPIResourceWithId[]> {
  let endpoints = [];
  const response = await api.get<Region>(`region/${regionName}`);

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

  const pokemons = pokemonSpecies.map(species => {
    return {
      id: Number(species.url.split('/')[species.url.split('/').length - 2]),
      name: species.name,
      url: species.url,
    }
  });

  return pokemons;
}

export function useRegionByNameQuery(regionName: string) {
  return useQuery({
    queryKey: ["region", regionName],
    queryFn: () => getRegionByName(regionName),
    staleTime: 1000 * 60 * 60, 
  });
}