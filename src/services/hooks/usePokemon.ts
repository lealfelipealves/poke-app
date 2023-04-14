import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export type Pokemon = {
  name: string;
  url: string;
}

type GetPokemonResponse = {
  count: number;
  pokemons: Pokemon[];
}

const PAGINATION_LIMIT = 1;

export async function getPokemon(page: number): Promise<GetPokemonResponse> {
  const { data } = await api.get('pokemon', {
    params: {
      limit: PAGINATION_LIMIT,
      offset: (page - 1) * PAGINATION_LIMIT,
    },
  });

  const pokemons = data.results.map((pokemon: any) => {
    return {
      name: pokemon.name,
      url: pokemon.url,
    }
  });

  return {
    count: data.count,
    pokemons
  };
}

export function usePokemonQuery(page: number) {
  return useQuery({
    queryKey: ["pokemon", page],
    queryFn: () => getPokemon(page),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}