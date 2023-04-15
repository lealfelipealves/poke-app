import { usePokemon } from '@/context/PokemonContext';
import { useModal } from '@/context/ModalContext';
import { PokemonItem } from '@/types';

type PokemonCardItemProps = {
  pokemon: PokemonItem;
}

export function PokemonCardItem({ pokemon }: PokemonCardItemProps) {
  const { setPokemonId } = usePokemon()
  const { setIsOpen } = useModal();

  function handleOpenModal() {
    setIsOpen(true);
    setPokemonId?.(pokemon.id);
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