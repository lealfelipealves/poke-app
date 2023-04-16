import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { Pokemon, Regions } from "pokenode-ts";
import { usePokemonInfiniteQuery } from "@/hooks/usePokemonInfiniteQuery";
import { NamedAPIResourceWithId } from "@/types";

type PokemonContextProps = {
  children: React.ReactNode;
};

type PokemonContextProviderProps = {
  searchTerm?: string;
  setSearchTerm?: (searchTerm: string) => void;
  filteredData?: NamedAPIResourceWithId[];
  setFilteredData?: (pokemonList: NamedAPIResourceWithId[]) => void;
  pokemon?: Pokemon;
  setPokemon?: (pokemon: Pokemon) => void;
  regionSelected?: Regions;
  setRegionSelected?: (region?: Regions) => void;
  currentPokemonList: NamedAPIResourceWithId[];
  filteredDataByRegion?: NamedAPIResourceWithId[];
  setFilteredDataByRegion?: (pokemonList: NamedAPIResourceWithId[]) => void;
};

export const PokemonContext = createContext<PokemonContextProviderProps>(
  {} as PokemonContextProviderProps
);
PokemonContext.displayName = "Pokemon Context";

export const PokemonProvider = ({ children }: PokemonContextProps) => {
  const { data } = usePokemonInfiniteQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<NamedAPIResourceWithId[]>(
    []
  );
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [regionSelected, setRegionSelected] = useState<Regions | undefined>();
  const [currentPokemonList, setCurrentPokemonList] = useState<
    NamedAPIResourceWithId[]
  >([]);
  const [filteredDataByRegion, setFilteredDataByRegion] = useState<
    NamedAPIResourceWithId[]
  >([]);

  const filterData = () => {
    const filtered = currentPokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered ?? []
  };

  useEffect(() => {
    if (searchTerm) {
      setSearchTerm("");
    }
  }, [regionSelected]);

  useEffect(() => {
    if (regionSelected) {
      setCurrentPokemonList(filteredDataByRegion);
    } else {
      setCurrentPokemonList(
        data?.pages.flatMap((page) => page.results.map((pokemon) => pokemon)) ||
          []
      );
    }

    if (searchTerm) {
      setCurrentPokemonList(filterData());
    } 
  }, [data, regionSelected, filteredDataByRegion, searchTerm]);


  const pokemonValue = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      pokemon,
      setPokemon,
      filteredData,
      setFilteredData,
      regionSelected,
      setRegionSelected,
      currentPokemonList,
      filteredDataByRegion,
      setFilteredDataByRegion,
    }),
    [
      searchTerm,
      setSearchTerm,
      pokemon,
      setPokemon,
      filteredData,
      setFilteredData,
      regionSelected,
      setRegionSelected,
      currentPokemonList,
      filteredDataByRegion,
      setFilteredDataByRegion,
    ]
  );

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
      "Para usar o usePokemon, é obrigatório o usuário do Provider"
    );
  }
  return context;
};
