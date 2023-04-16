import { render, fireEvent } from '@testing-library/react';
import { PokemonCardList } from './index';

import { usePokemonInfiniteQuery } from "@/hooks/usePokemonInfiniteQuery";
import { usePokemon } from "@/context/PokemonContext";

jest.mock("@/hooks/usePokemonInfiniteQuery");
jest.mock("@/context/PokemonContext");


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
      currentPokemonList: [
        { name: "pokemon1", id: 1 },
        { name: "pokemon2", id: 2 },
      ],
    });
  });
  
  it("renders component with correct text and buttons", () => {
    const { getByText, getByRole, debug } = render(<PokemonCardList />);

    debug();
    
    expect(getByRole("button")).toBeInTheDocument();
    expect(getByText(/Carregar os próximos/i)).toBeInTheDocument();
    expect(getByText(/pokemon1/i)).toBeInTheDocument();
    expect(getByText(/pokemon2/i)).toBeInTheDocument();
  });

  it("fetches next page of results when button is clicked", () => {
    const { getByRole } = render(<PokemonCardList />);
    fireEvent.click(getByRole("button"));
    expect(usePokemonInfiniteQuery().fetchNextPage).toHaveBeenCalled();
  });

  it("renders spinner when loading data", () => {
    usePokemonInfiniteQuery.mockReturnValue({
      isError: false,
      isLoading: true,
      isFetching: false,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
    });

    const { getByRole } = render(<PokemonCardList />);
    expect(getByRole("status")).toBeInTheDocument();
  });
});