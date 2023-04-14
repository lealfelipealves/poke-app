import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../api';
import axios, { AxiosResponse } from 'axios';
import { Pokemon } from 'pokenode-ts'

type GetPokemonResponse = {
  next?: number;
  previous?: number;
  pokemons: Pokemon[];
}

const PAGINATION_LIMIT = 20;

export async function getPokemon({ pageParam = 1 }): Promise<GetPokemonResponse> {
  const countInitial = ((PAGINATION_LIMIT * pageParam) - PAGINATION_LIMIT) + 1;
  const countMaximum = (PAGINATION_LIMIT * pageParam) + 1;
  let endpoints = [];

  for(let i = countInitial; i <= countMaximum; i++) {
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

export function usePokemonQuery(page: number) {
  return useInfiniteQuery({
    queryKey: ["pokemon", page],
    queryFn: getPokemon,
    staleTime: 1000 * 60 * 10, // 10 minutes,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}