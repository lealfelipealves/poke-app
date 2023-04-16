import { useEffect } from 'react';
import { usePokemon } from '@/context/PokemonContext';
import { useRegionsQuery } from '@/hooks/useRegionsQuery';
import { getRegionByName, useRegionByNameQuery } from '@/hooks/useRegionByNameQuery';
import { queryClient } from '@/services/queryClient';
import { Spinner } from '../Spinner';
import { NamedAPIResourceWithId } from '@/types';

export function RegionFilter() {
  const { isLoading, data, error } = useRegionsQuery();
  const { setFilteredData } = usePokemon();

  const { 
    isFetching: isFetchingRegionByName, 
    data: dataRegionByName
  } = useRegionByNameQuery('kanto')

  useEffect(() => {
    if (dataRegionByName) {
      setFilteredData(dataRegionByName);
    }
  }, [dataRegionByName, setFilteredData]);
    
  async function handlePrefetchRegion(regionName: string) {
    await queryClient.prefetchQuery(['region', regionName], () => getRegionByName(regionName), {
      staleTime: 1000 * 60 * 10,
    });
  }

  async function handleFilterRegion(regionName: string) {
    const queryKey = ['region', regionName];
    const data = queryClient.getQueryData<NamedAPIResourceWithId[]>(queryKey);
    setFilteredData(data!);
  }
  
  return (
    <div className="flex max-w-screen-lg rounded-2xl items-center justify-center w-full bg-white p-4">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>Error: erro</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-2">
          {data?.regions.map((region) => (
            <button
              key={region.name}
              type="button"
              onMouseEnter={() => handlePrefetchRegion(region.name)}
              onClick={() => handleFilterRegion(region.name)}
            >
              <div className="flex flex-col items-center justify-center border border-red-500 p-2 rounded-md">
                {region.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
