import { useEffect } from 'react'
import { CardItem } from '@/components/CardItem'
import { Header } from '@/components/Header'
import { usePokemonQuery } from '@/services/hooks/usePokemon'
import { useInView } from 'react-intersection-observer'

export default function Home() {
  const { ref, inView } = useInView()
  const {
    isLoading,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePokemonQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-start gap-4 bg-gradient-to-b from-[#ef5350] to-[#e53935] p-4">
      <Header />
      <div className="flex">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: erro</p>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-6 w-full max-w-screen-lg flex-wrap items-center justify-evenly p-4 gap-4">
              {data?.pages.map((pag) => (
                pag.pokemons.map((poke) => (
                  <CardItem key={poke.name} pokemon={poke} />
                ))
              ))}            
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
            <div>
              {isFetching && !isFetchingNextPage
                ? 'Atualização em segundo plano...'
                : null}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
