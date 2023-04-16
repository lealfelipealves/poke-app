import { renderHook } from '@testing-library/react-hooks';
import { usePokemonByNameQuery, getPokemonDetails } from '../usePokemonByNameQuery';
import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('usePokemonByNameQuery', () => {
  test('should call useQuery with the correct parameters', () => {
    const pokemonName = 'bulbasaur';
    const expectedQueryKey = ['pokemon', pokemonName];

    renderHook(() => usePokemonByNameQuery(pokemonName));

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: expectedQueryKey,
      queryFn: expect.any(Function),
      staleTime: 600000,
      keepPreviousData: true,
    });
  });
});

jest.mock("@/services/api");

describe("getPokemonDetails", () => {
  it("should return the details of a pokemon", async () => {
    const pokemonName = "charizard";
    const pokemonData = { name: pokemonName, type: "fire" };
    (api.get as jest.Mock).mockResolvedValueOnce({ data: pokemonData });
    
    const result = await getPokemonDetails(pokemonName);
    
    expect(api.get).toHaveBeenCalledWith(`pokemon/${pokemonName}`);
    expect(result).toEqual(pokemonData);
  });
});