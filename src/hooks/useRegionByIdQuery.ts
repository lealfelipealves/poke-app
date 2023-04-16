import axios, { AxiosResponse } from 'axios';
import { Region, Pokedex, NamedAPIResource } from 'pokenode-ts'
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export async function getRegionById(regionId: number): Promise<NamedAPIResource[]> {
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
  
  return pokemonSpecies;
}

export function useRegionByIdQuery(regionId: number) {
  return useQuery({
    queryKey: ["region", regionId],
    queryFn: () => getRegionById(regionId),
    staleTime: 1000 * 60 * 60, 
  });
}