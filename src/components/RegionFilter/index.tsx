import { getRegionById, useRegionByIdQuery } from '@/hooks/useRegionByIdQuery';
import { queryClient } from '@/services/queryClient';
import { Spinner } from '../Spinner';
import { useAllRegionQuery } from '@/hooks/useRegion';
import { getRegionByName } from '@/hooks/useRegionByNameQuery';

export function RegionFilter() {
  const { isLoading, data, error } = useAllRegionQuery();

  async function handlePrefetchRegion(regionName: string) {
    await queryClient.prefetchQuery(['region', regionName], () => getRegionByName(regionName), {
      staleTime: 1000 * 60 * 10,
    });
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
