import { usePokemon } from '@/context/PokemonContext';
import { useModal } from '@/context/ModalContext';
import { PokemonItem } from '@/types';
import { Pokemon } from 'pokenode-ts';

type PokemonCardItemProps = {
  pokemon: PokemonItem;
}

export function PokemonCardItem({ pokemon }: PokemonCardItemProps) {
  const { setPokemon, pokemon: pokemonData } = usePokemon()
  const { setIsOpen } = useModal();

  function handleOpenModal() {
    setIsOpen(true);
    setPokemon?.({
      ...pokemonData,
      name: pokemon.name,
    } as Pokemon);
  }

  return(
    <div 
      className="flex flex-col w-full rounded-2xl items-start justify-center bg-white font-bold text-lg p-4 cursor-pointer" 
      onClick={handleOpenModal}
    >
      <span>#{pokemon.id} - {pokemon.name}</span>
    </div>
  );
}