import React, { createContext, useState, useContext } from 'react';
import { Pokemon } from 'pokenode-ts'

type PokemonContextProps = {
  children: React.ReactNode
}

type PokemonContextProviderProps = {
  pokemon?: Pokemon
  setPokemon: (pokemon: Pokemon) => void
}

export const PokemonContext = createContext<PokemonContextProviderProps>(
  {} as PokemonContextProviderProps
)
PokemonContext.displayName = 'Pokemon Context'

export const PokemonProvider = ({ children }: PokemonContextProps) => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  return (
    <PokemonContext.Provider
      value={{ pokemon, setPokemon }}
    >
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
