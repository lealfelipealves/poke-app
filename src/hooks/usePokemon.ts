import { NamedAPIResource, Pokemon } from 'pokenode-ts'
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export interface PokemonItem extends NamedAPIResource {
  id: string
}

type GetPokemonItemResponse = {
  count?: number;
  next?: number;
  previous?: number;
  pokemons: PokemonItem[];
}

const PAGINATION_LIMIT = 18;

export async function getPokemonWithPagination({ pageParam = 0 }): Promise<GetPokemonItemResponse> {
  let next = undefined;
  let previous = undefined;
  const { data } = await api.get('pokemon', {
    params: {
      limit: PAGINATION_LIMIT,
      offset: pageParam,
    },
  });

  if(data.next !== null) {
    const nextURL = new URLSearchParams(new URL(data.next).search);
    next = Number(nextURL.get("offset"));
  }

  if(data.previous !== null) {
    const previousURL = new URLSearchParams(new URL(data.previous).search);
    previous = Number(previousURL.get("offset"));
  }

  const pokemons = data.results.map((pokemon: any) => {
    return {
      name: pokemon.name,
      url: pokemon.url,
    }
  });

  return {
    count: data.count,
    next,
    previous,
    pokemons
  };
}

export function usePokemonQuery() {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemonWithPagination,
    staleTime: 1000 * 60 * 10, // 10 minutes,
    keepPreviousData: true,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}