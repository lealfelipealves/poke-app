import { NamedAPIResourceList } from 'pokenode-ts'
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export async function getPokemon(): Promise<NamedAPIResourceList> {
  const { data } = await api.get<NamedAPIResourceList>('pokemon?limit=1300');

  const pokemons = data.results.map((pokemon) => {
    return {
      id: Number(pokemon.url.split('/')[6]),
      name: pokemon.name,
      url: pokemon.url,        
    }
  });

  return {
    ...data,
    results: pokemons
  };
}

export function usePokemonQuery() {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemon,
    staleTime: 1000 * 60 * 60, // 60 minutes
  });
}