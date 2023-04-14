import { NamedAPIResourceList, NamedAPIResource, Region } from 'pokenode-ts'
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

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
  const response = await api.get<Region>(`region/${regionId}`);
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