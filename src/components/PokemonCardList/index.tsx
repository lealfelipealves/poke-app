import { useEffect } from 'react';
import { PokemonCardItem } from '@/components/PokemonCardItem';
import { usePokemonByIdQuery } from '@/hooks/usePokemonById';
import { useInView } from 'react-intersection-observer';

export function PokemonCardList() {
  const { ref, inView } = useInView();
  const { data, isError, isLoading, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    usePokemonByIdQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="flex">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: erro</p>
      ) : (
        <div className="flex flex-col">
          <div className="grid grid-cols-6 w-full max-w-screen-lg flex-wrap items-center justify-evenly p-4 gap-4">
            {data?.pages.map((pag) =>
              pag.pokemons.map((poke) => <PokemonCardItem key={poke.name} pokemon={poke} />)
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
