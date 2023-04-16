import { useEffect } from 'react';
import { usePokemon } from '@/context/PokemonContext';
import { useRegionsQuery } from '@/hooks/useRegionsQuery';
import { getRegionByName, useRegionByNameQuery } from '@/hooks/useRegionByNameQuery';
import { queryClient } from '@/services/queryClient';
import { Spinner } from '../Spinner';
import { NamedAPIResourceWithId } from '@/types';

export function RegionFilter() {
  const { isLoading, data, error } = useRegionsQuery();
  const { setFilteredDataByRegion, setRegionSelected, regionSelected } = usePokemon();

  const { 
    isFetching: isFetchingRegionByName, 
    data: dataRegionByName
  } = useRegionByNameQuery('kanto')

  useEffect(() => {
    if (dataRegionByName) {
      setFilteredDataByRegion?.(dataRegionByName);
    }
  }, [dataRegionByName, setFilteredDataByRegion]);
    
  async function handlePrefetchRegion(regionName: string) {
    await queryClient.prefetchQuery(['region', regionName], () => getRegionByName(regionName), {
      staleTime: 1000 * 60 * 10,
    });
  }

  async function handleFilterRegion(region: NamedAPIResourceWithId) {
    if(regionSelected && regionSelected === region.id) {
      setRegionSelected?.(undefined);
      setFilteredDataByRegion?.([]);
    } else {
      const queryKey = ['region', region.name];
      const data = queryClient.getQueryData<NamedAPIResourceWithId[]>(queryKey);
      setRegionSelected?.(region.id);
      setFilteredDataByRegion?.(data!);
    }  
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
              onClick={() => handleFilterRegion(region)}
            >
              <div className={`flex flex-col items-center justify-center border border-red-500 p-2 rounded-md ${region.id === regionSelected ? 'bg-red-500 text-white' : ''}`}>
                {region.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
