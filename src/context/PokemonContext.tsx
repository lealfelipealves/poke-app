import React, { createContext, useState, useMemo, useContext } from 'react';
import { Pokemon } from 'pokenode-ts'

type PokemonContextProps = {
  children: React.ReactNode
}

type PokemonContextProviderProps = {
  pokemon?: Pokemon
  setPokemon?: (pokemon: Pokemon) => void,
  pokemonId: number,
  setPokemonId?: (pokemonId: number) => void
}

export const PokemonContext = createContext<PokemonContextProviderProps>(
  {} as PokemonContextProviderProps
)
PokemonContext.displayName = 'Pokemon Context'

export const PokemonProvider = ({ children }: PokemonContextProps) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonId, setPokemonId] = useState<number>(1);

  const pokemonValue = useMemo(() => ({
    pokemon, setPokemon, pokemonId, setPokemonId
  }), [
    pokemon, setPokemon, pokemonId, setPokemonId
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
