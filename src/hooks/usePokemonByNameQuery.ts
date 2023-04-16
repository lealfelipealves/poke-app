import { useQuery } from '@tanstack/react-query';
import { Pokemon } from 'pokenode-ts'
import { api } from '@/services/api';

export async function getPokemonDetails(pokemonName: string): Promise<Pokemon> {
  const { data } = await api.get(`pokemon/${pokemonName}`);
  return data;
}

export function usePokemonByNameQuery(pokemonName: string) {
  return useQuery({
    queryKey: ["pokemon", pokemonName],
    queryFn: () => getPokemonDetails(pokemonName),
    staleTime: 1000 * 60 * 10, // 10 minutes,
    keepPreviousData: true,
  });
}