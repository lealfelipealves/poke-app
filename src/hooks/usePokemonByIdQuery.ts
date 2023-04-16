import { Pokemon } from 'pokenode-ts'
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export async function getPokemonById(pokemonId: number): Promise<Pokemon> {
  const { data } = await api.get(`pokemon/${pokemonId}`);
  return data
}

export function usePokemonByIdQuery(pokemonId: number) {
  return useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 60, // 60 minutes,
    keepPreviousData: true,
  });
}