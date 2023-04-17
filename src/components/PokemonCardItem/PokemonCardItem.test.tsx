import { useModal } from '@/context/ModalContext';
import { usePokemon } from '@/context/PokemonContext';
import { fireEvent, render, screen } from '@testing-library/react';
import { PokemonCardItem } from './index';

const pokemon = {
  id: 1,
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
};

jest.mock('@/context/PokemonContext');
jest.mock('@/context/ModalContext');

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

describe('PokemonCardItem', () => {
  const pokemon = { id: 1, name: 'bulbasaur' };
  const setPokemon = jest.fn();
  const setIsOpen = jest.fn();
  usePokemon.mockReturnValue({ setPokemon, pokemon });
  useModal.mockReturnValue({ setIsOpen });

  beforeEach(() => {
    render(<PokemonCardItem pokemon={pokemon} />);
  });

  test('should call setPokemon and setIsOpen with the correct arguments when clicked', () => {
    fireEvent.click(screen.getByTestId('pokemon-card-item'));

    expect(setIsOpen).toHaveBeenCalledWith(true);
    expect(setPokemon).toHaveBeenCalledWith({
      ...pokemon,
      name: pokemon.name,
    });
  });
});