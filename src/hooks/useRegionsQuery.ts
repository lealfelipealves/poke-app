import { NamedAPIResourceList } from "pokenode-ts";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { NamedAPIResourceWithId } from "@/types";

type GetPokemonResponse = {
  count: number;
  regions: NamedAPIResourceWithId[];
};

export async function getRegions(): Promise<GetPokemonResponse> {
  const { data } = await api.get<NamedAPIResourceList>("region");

  const regions: NamedAPIResourceWithId[] = data.results.map((pokemon: any) => {
    return {
      id: pokemon.url.split("/")[pokemon.url.split("/").length - 2],
      name: pokemon.name,
      url: pokemon.url,
    };
  });

  return {
    count: data.count,
    regions: regions,
  };
}

export function useRegionsQuery() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
    staleTime: 1000 * 60 * 60,
  });
}
