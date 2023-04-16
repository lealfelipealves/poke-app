import { render, fireEvent, getByTestId } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PokemonCardList } from './index';
import { usePokemonInfiniteQuery } from "@/hooks/usePokemonInfiniteQuery";
import { PokemonContext, PokemonProvider, usePokemon } from "@/context/PokemonContext";

import { pokemon } from '@/mocks/pokemon'

jest.mock('@/context/PokemonContext');
jest.mock('@/hooks/usePokemonInfiniteQuery');

jest.mock("react-intersection-observer", () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: true,
  }),
}));

describe('PokemonCardList', () => {
  beforeEach(() => {
    usePokemonInfiniteQuery.mockReturnValue({
      isError: false,
      isLoading: false,
      isFetching: false,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
    });

    usePokemon.mockReturnValue({
      currentPokemonList: pokemon.results,
    });
  });
  
  it("renders component with correct text and buttons", () => {
    const { getByText, getByRole } = render(<PokemonCardList />);
    expect(getByRole("button")).toBeInTheDocument();
    expect(getByText(/Carregar os próximos/i)).toBeInTheDocument();
    expect(getByText(/#1 - bulbasaur/i)).toBeInTheDocument();
    expect(getByText(/#2 - ivysaur/i)).toBeInTheDocument();
  });

  it("fetches next page of results when button is clicked", () => {
    const { getByRole } = render(<PokemonCardList />);
    fireEvent.click(getByRole("button"));
    expect(usePokemonInfiniteQuery().fetchNextPage).toHaveBeenCalled();
  });

  it("renders correctly when there are pokemons and there is a next page", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    
    const currentPokemonList = pokemon.results;

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <PokemonContext.Provider value={{ currentPokemonList }}>
          <PokemonCardList />
        </PokemonContext.Provider>
      </QueryClientProvider>
    );

    const pokemonCards = getByText("#1 - bulbasaur");
    expect(pokemonCards).toBeInTheDocument();

    const loadMoreButton = getByText("Carregar os próximos");
    expect(loadMoreButton).toBeInTheDocument();
  });

  it("renders spinner when loading data", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    usePokemonInfiniteQuery.mockReturnValue({
      isError: false,
      isLoading: true,
      isFetching: false,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
    });

    usePokemon.mockReturnValue({
      currentPokemonList: [],
    });

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <PokemonContext.Provider value={{}}>
          <PokemonCardList />
        </PokemonContext.Provider>
      </QueryClientProvider>
    );


    expect(getByTestId("pokemon-card-list-loading")).toBeInTheDocument();
  });
});