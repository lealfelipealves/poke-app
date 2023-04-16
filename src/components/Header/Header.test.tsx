import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonContext } from '@/context/PokemonContext';
import { Header } from './index';

describe('Spinner', () => {
  it('renders search input', () => {
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders header component', () => {
    const searchTerm = '';
    const setSearchTerm = jest.fn();
  
    const Wrapper = ({ children }: any) => {
      return (
        <PokemonContext.Provider value={{ searchTerm, setSearchTerm }}>
          {children}
        </PokemonContext.Provider>
      );
    };
  
    const { getByAltText, getByPlaceholderText } = render(<Header />, { wrapper: Wrapper });
  
    const logo = getByAltText('pokemon_logo');
    const searchInput = getByPlaceholderText('Search');
  
    expect(logo).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  
    fireEvent.change(searchInput, { target: { value: 'pikachu' } });
  
    expect(setSearchTerm).toHaveBeenCalledTimes(1);
    expect(setSearchTerm).toHaveBeenCalledWith('pikachu');
  });
});