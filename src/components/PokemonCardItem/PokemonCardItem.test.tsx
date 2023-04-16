import { render, screen } from '@testing-library/react';
import { PokemonCardItem } from './index';

const pokemon = {
  id: 1,
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
};

describe('PokemonCardItem', () => {
  it('renders correctly', () => {
    const { container } = render(<PokemonCardItem pokemon={pokemon} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders pokemon name and id", () => {
    render(<PokemonCardItem pokemon={pokemon} />);
    const pokemonNameAndId = screen.getByText("#1 - bulbasaur");
    expect(pokemonNameAndId).toBeInTheDocument();
  });
});