import { renderHook } from "@testing-library/react-hooks";
import { PokemonContext, PokemonProvider, usePokemon } from "./PokemonContext";
import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { act } from "react-dom/test-utils";

describe("PokemonContext", () => {
  it("should provide the expected values", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <PokemonProvider>{children}</PokemonProvider>
      </QueryClientProvider>      
    );

    const { result } = renderHook(() => usePokemon(), { wrapper });

    expect(result.current.searchTerm).toBe("");
    expect(typeof result.current.setSearchTerm).toBe("function");

    expect(result.current.filteredData).toEqual([]);
    expect(typeof result.current.setFilteredData).toBe("function");

    expect(result.current.pokemon).toBeUndefined();
    expect(typeof result.current.setPokemon).toBe("function");

    expect(result.current.regionSelected).toBeUndefined();
    expect(typeof result.current.setRegionSelected).toBe("function");

    expect(result.current.currentPokemonList).toEqual([]);
    expect(result.current.filteredDataByRegion).toEqual([]);
    expect(typeof result.current.setFilteredDataByRegion).toBe("function");
  });

  it('should render or Provider correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <PokemonProvider>{children}</PokemonProvider>
      </QueryClientProvider>      
    );
    const { result } = renderHook(() => usePokemon(), { wrapper });

    expect(result.current.searchTerm).toBe('');
    expect(result.current.regionSelected).toBeUndefined();

    act(() => {
      result.current.setSearchTerm('charmander');
    });

    expect(result.current.searchTerm).toBe('charmander');
  });

  it('should throw an error if used outside PokemonProvider', () => {
    const { result } = renderHook(() => usePokemon(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <PokemonContext.Provider value={null}>{children}</PokemonContext.Provider>
      ),
    });

    expect(result.error).toEqual(
      Error('Para usar o usePokemon, é obrigatório o usuário do Provider')
    );
  });
});