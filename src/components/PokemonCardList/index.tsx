import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PokemonCardItem } from '@/components/PokemonCardItem';
import { usePokemonInfiniteQuery } from '@/hooks/usePokemonInfiniteQuery';
import { usePokemonQuery } from '@/hooks/usePokemonQuery';
import { Spinner } from '../Spinner';

export function PokemonCardList() {
  const { ref, inView } = useInView();

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

  const {
    isLoading: isLoadingPokemonByName,
    isFetching: isFetchingPokemonByName,
    data: dataPokemonByName,
  } = usePokemonQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="flex">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>Error: erro</p>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-wrap w-full max-w-screen-lg items-center justify-evenly gap-4">
            {data?.pages.map((pag) =>
              pag.results.map((pokemon) => 
                <PokemonCardItem key={pokemon.name} pokemon={pokemon} />
              )
            )}
          </div>
          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Carregando...'
                : hasNextPage
                  ? 'Cerregar os proximos'
                  : 'Nada mais para carregar'}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? 'Atualização em segundo plano...' : null}</div>
        </div>
      )}
    </div>
  );
}
