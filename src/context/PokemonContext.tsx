import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { Pokemon, Regions } from 'pokenode-ts'
import { usePokemonInfiniteQuery } from '@/hooks/usePokemonInfiniteQuery';
import { NamedAPIResourceWithId } from '@/types';

type PokemonContextProps = {
  children: React.ReactNode
}

type PokemonContextProviderProps = {
  searchTerm?: string
  setSearchTerm: (searchTerm: string) => void,
  filteredData?: NamedAPIResourceWithId[],
  setFilteredData: (pokemonList: NamedAPIResourceWithId[]) => void,
  pokemon?: Pokemon
  setPokemon: (pokemon: Pokemon) => void,
  regionSelected?: Regions
  setRegionSelected: (region?: Regions) => void
}

export const PokemonContext = createContext<PokemonContextProviderProps>(
  {} as PokemonContextProviderProps
)
PokemonContext.displayName = 'Pokemon Context'

export const PokemonProvider = ({ children }: PokemonContextProps) => {
  const { data } = usePokemonInfiniteQuery();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<NamedAPIResourceWithId[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon>();  
  const [regionSelected, setRegionSelected] = useState<Regions | undefined>();

  const filterData = () => {
    const filtered = data?.pages.flatMap((page) =>
      page.results.filter((pokemon) => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ).map((pokemon) => pokemon)
    setFilteredData(filtered ?? []);
  };
  
  useEffect(() => {
    filterData();
  }, [data, searchTerm]);

  const pokemonValue = useMemo(() => ({
    searchTerm, setSearchTerm,
    pokemon, setPokemon,
    filteredData, setFilteredData,
    regionSelected, setRegionSelected
  }), [
    searchTerm, setSearchTerm,
    pokemon, setPokemon,
    filteredData, setFilteredData,
    regionSelected, setRegionSelected
  ]);

  return (
    <PokemonContext.Provider value={pokemonValue}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error(
      'Para usar o usePokemon, é obrigatório o usuário do Provider'
    )
  }
  return context
}
