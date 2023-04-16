import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { PokemonList } from '@/types';

const PAGINATION_LIMIT = 18;

export async function getPokemonWithPagination({ pageParam = 0 }): Promise<PokemonList> {
  let next = null;
  let previous = null;
  
  const { data } = await api.get('pokemon', {
    params: {
      limit: PAGINATION_LIMIT,
      offset: pageParam,
    },
  });

  if(data.next !== null) {
    const nextURL = new URLSearchParams(new URL(data.next).search);
    next = nextURL.get("offset");
  }

  if(data.previous !== null) {
    const previousURL = new URLSearchParams(new URL(data.previous).search);
    previous = previousURL.get("offset");
  }

  const resultsFormatted = data.results.map((pokemon: any) => {
    return {
      id: Number(pokemon.url.split("/")[6]),
      name: pokemon.name,
      url: pokemon.url,
    }
  });

  return {
    count: data.count,
    next,
    previous,
    results: resultsFormatted
  };
}

export function usePokemonInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: getPokemonWithPagination,
    staleTime: 1000 * 60 * 10, // 10 minutes,
    keepPreviousData: true,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}