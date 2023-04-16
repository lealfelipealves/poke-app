import Image from 'next/image';
import { useAllRegionQuery } from '@/hooks/useRegion';
import { usePokemon } from '@/context/PokemonContext';
import { Spinner } from '../Spinner';

export function Header() {
  const { isLoading, data, error } = useAllRegionQuery();
  const { searchTerm, setSearchTerm } = usePokemon();

  /*async function handlePrefetchRegion(regionId: string) {
    queryClient.invalidateQueries(['pokemon']);
    await queryClient.prefetchQuery(['pokemon'], () => getRegionById(regionId), {
      staleTime: 1000 * 60 * 10,
    });
  }*/

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <div className="flex max-w-screen-lg rounded-2xl items-center justify-between w-full bg-white p-4">
        <div className="flex">
          <Image src="/images/pokeapi_256.png" alt="pokemon" width={100} height={24} priority />
        </div>

        <div className="flex flex-wrap justify-center">
          <input
            type="search"
            placeholder="Search"
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
      </div>

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
                onMouseEnter={() => {}}
              >
                <div className="flex flex-col items-center justify-center border border-red-500 p-2 rounded-md">
                  {region.name}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
