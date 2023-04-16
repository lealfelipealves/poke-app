import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PokemonCardItem } from '@/components/PokemonCardItem';
import { usePokemonInfiniteQuery } from '@/hooks/usePokemonInfiniteQuery';
import { usePokemon } from '@/context/PokemonContext';
import { Spinner } from '../Spinner';

export function PokemonCardList() {
  const { ref, inView } = useInView();
  const { filteredData } = usePokemon();

  const { 
    data, 
    isError, 
    isLoading, 
    isFetching, 
    isFetchingNextPage, 
    fetchNextPage, 
    hasNextPage
  } =
  usePokemonInfiniteQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="flex w-full max-w-screen-lg">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>Error: erro</p>
      ) : (
        <div className="flex flex-col flex-wrap w-full">
          <div className="flex flex-wrap w-full gap-4">
            {filteredData ? (
              filteredData?.map((pokemon) => (
                <PokemonCardItem key={pokemon.name} pokemon={pokemon} />
              ))
            ) : (
              <div className='flex w-full flex-wrap gap-4'>
                {data?.pages.map((pag) =>
                  pag.results.map((pokemon) => 
                    <PokemonCardItem key={pokemon.name} pokemon={pokemon} />
                  )
                )}
                <button
                  className='flex w-full justify-center items-center'
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? <Spinner />
                    : hasNextPage
                      ? 'Cerregar os proximos'
                      : 'Nada mais para carregar'}
                </button>
              </div>
            )}
          </div>
          <div>{isFetching && !isFetchingNextPage ? 'Atualização em segundo plano...' : null}</div>
        </div>
      )}
    </div>
  );
}
