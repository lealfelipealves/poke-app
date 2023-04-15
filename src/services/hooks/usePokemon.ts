import { NamedAPIResource, Pokemon } from 'pokenode-ts'
import { useInfiniteQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { api } from '../api';

export interface PokemonItem extends NamedAPIResource {
  id: string
}

type GetPokemonItemResponse = {
  count?: number;
  next?: number;
  previous?: number;
  pokemons: PokemonItem[];
}

type GetPokemonResponse = {
  count?: number;
  next?: number;
  previous?: number;
  pokemons: Pokemon[];
}


const PAGINATION_LIMIT = 18;

export async function getAllPokemon({ pageParam = 0 }): Promise<GetPokemonItemResponse> {
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

export function useAllPokemonQuery() {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: getAllPokemon,
    staleTime: 1000 * 60 * 10, // 10 minutes,
    keepPreviousData: true,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    getNextPageParam: (lastPage) => lastPage.next
  });
}

export function usePokemonQuery() {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemonById,
    staleTime: 1000 * 60 * 60, // 60 minutes,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}