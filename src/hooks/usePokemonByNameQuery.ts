import { useQuery } from '@tanstack/react-query';
import { Pokemon } from 'pokenode-ts'
import { api } from '@/services/api';

export async function getPokemonDetails(name: string): Promise<Pokemon> {
  const { data } = await api.get(`pokemon/${name}`);
  return data;
}

export function usePokemonByNameQuery(name: string) {
  return useQuery({
    queryKey: ["pokemonName", name],
    queryFn: () => getPokemonDetails(name),
    staleTime: 1000 * 60 * 10, // 10 minutes,
    keepPreviousData: true,
  });
}