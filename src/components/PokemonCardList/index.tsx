import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PokemonCardItem } from "@/components/PokemonCardItem";
import { usePokemonInfiniteQuery } from "@/hooks/usePokemonInfiniteQuery";
import { usePokemon } from "@/context/PokemonContext";
import { Spinner } from "../Spinner";
import { Error } from "../Error";

export function PokemonCardList() {
  const { ref, inView } = useInView();
  const { currentPokemonList } = usePokemon();
  const {
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePokemonInfiniteQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    <div className="flex w-full max-w-screen-lg">
      <Spinner />
    </div>;
  }

  if (isError) {
    <div className="flex w-full max-w-screen-lg">
      <Error />
    </div>;
  }

  return (
    <div className="flex w-full max-w-screen-lg">
      {
        <div className="flex flex-col flex-wrap w-full">
          <div className="flex flex-wrap w-full gap-4">
            <div className="flex w-full flex-wrap gap-4">
              {currentPokemonList?.map((pokemon) => (
                <PokemonCardItem key={pokemon.name} pokemon={pokemon} />
              ))}
              <button
                className="flex w-full justify-center items-center"
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <Spinner />
                ) : hasNextPage ? (
                  "Cerregar os próximos"
                ) : (
                  "Nada mais para carregar"
                )}
              </button>
            </div>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Atualização em segundo plano..."
              : null}
          </div>
        </div>
      }
    </div>
  );
}
