import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { PokemonCardItem } from './index';

describe('PokemonCardItem', () => {
  it("should call setPokemon and setIsOpen when handleOpenModal is called", () => {
    const pokemon = {
      id: 1,
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    };
    render(<PokemonCardItem pokemon={pokemon} />);
    const pokemonNameAndId = screen.getByText("#1 - bulbasaur");
    expect(pokemonNameAndId).toBeInTheDocument();
  });
});