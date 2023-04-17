import { useEffect } from "react";
import { usePokemon } from "@/context/PokemonContext";
import { useRegionsQuery } from "@/hooks/useRegionsQuery";
import {
  getRegionByName,
  useRegionByNameQuery,
} from "@/hooks/useRegionByNameQuery";
import { queryClient } from "@/services/queryClient";
import { NamedAPIResourceWithId } from "@/types";
import { Spinner } from "../Spinner";
import { Error } from "../Error";

export function RegionFilter() {
  const { isLoading, data, isError } = useRegionsQuery();
  const { setFilteredDataByRegion, setRegionSelected, regionSelected } =
    usePokemon();

  const { data: dataRegionByName } = useRegionByNameQuery("kanto");

  useEffect(() => {
    if (dataRegionByName) {
      setFilteredDataByRegion?.(dataRegionByName);
    }
  }, [dataRegionByName, setFilteredDataByRegion]);

  async function handlePrefetchRegion(regionName: string) {
    await queryClient.prefetchQuery(
      ["region", regionName],
      () => getRegionByName(regionName),
      {
        staleTime: 1000 * 60 * 10,
      }
    );
  }

  async function handleFilterRegion(region: NamedAPIResourceWithId) {
    if (regionSelected && regionSelected === region.id) {
      setRegionSelected?.(undefined);
      setFilteredDataByRegion?.([]);
    } else {
      const queryKey = ["region", region.name];
      const data = queryClient.getQueryData<NamedAPIResourceWithId[]>(queryKey);
      setRegionSelected?.(region.id);
      setFilteredDataByRegion?.(data!);
    }
  }

  if (isLoading) {
    return (
      <div
        data-testid="region-filter-loading"
        className="flex max-w-screen-lg rounded-2xl items-center justify-center w-full bg-white p-4"
      >
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div 
        data-testid="region-filter-error"
        className="flex max-w-screen-lg rounded-2xl items-center justify-center w-full bg-white p-4"
      >
        <Error />
      </div>
    );
  }

  return (
    <div className="flex max-w-screen-lg rounded-2xl items-center justify-center w-full bg-white p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {data?.regions.map((region) => (
          <button
            key={region.name}
            type="button"
            onMouseEnter={() => handlePrefetchRegion(region.name)}
            onClick={() => handleFilterRegion(region)}
          >
            <div
              className={`flex flex-col items-center justify-center border border-red-500 p-2 rounded-md ${
                region.id === regionSelected ? "bg-red-500 text-white" : ""
              }`}
            >
              {region.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
