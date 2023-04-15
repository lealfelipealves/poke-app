import axios, { AxiosResponse } from 'axios';
import { NamedAPIResource, Pokemon } from 'pokenode-ts'
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { PokemonItem } from '@/types';

type GetPokemonResponse = {
  count?: number;
  next?: number;
  previous?: number;
  pokemons: Pokemon[];
}

const PAGINATION_LIMIT = 18;

export async function getPokemonById({ pageParam = 1 }): Promise<GetPokemonResponse> {
  const countInitial = ((PAGINATION_LIMIT * pageParam) - PAGINATION_LIMIT) + 1;
  const countMaximum = (PAGINATION_LIMIT * pageParam) + 1;
  let endpoints = [];

  for(let i = countInitial; i < countMaximum; i++) {
    endpoints.push(`pokemon/${i}`)
  }

  const requests = endpoints.map(endpoint => api.get(endpoint));
  const responses: AxiosResponse<Pokemon>[]  = await axios.all(requests);

  const pokemons = axios.spread<AxiosResponse<Pokemon>, Pokemon[]>((...responses) => {
    return responses.map(response => response.data);
  })(responses);
  
  return {
    next: pageParam + 1,
    pokemons
  };
}

export function usePokemonByIdQuery() {
  return useInfiniteQuery({
    queryKey: ["pokemonListById"],
    queryFn: getPokemonById,
    staleTime: 1000 * 60 * 60, // 60 minutes,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}