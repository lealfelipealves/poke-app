import Image from 'next/image'

import { Pokemon } from "pokenode-ts";
import { usePokemon } from '@/context/PokemonContext';
import { useModal } from '@/context/ModalContext';

type PokemonCardItemProps = {
  pokemon: Pokemon;
}

export function PokemonCardItem({ pokemon }: PokemonCardItemProps) {
  const { setPokemon } = usePokemon()
  const { setIsOpen } = useModal();

  function handleOpenModal() {
    setIsOpen(true);
    setPokemon(pokemon);
  }

  return(
    <div 
      className="flex flex-col w-full h-full max-h-96 rounded-2xl items-center justify-center bg-white py-12 px-4 font-bold text-2xl gap-6" 
      onClick={handleOpenModal}
    >
      {pokemon.sprites?.other && (
        <Image className='w-full h-full max-h-20' src={pokemon.sprites.other?.dream_world.front_default || ""} width={100} height={100} alt={pokemon.name} title={pokemon.name} />
      )}
      <span>{pokemon.name}</span>
    </div>
  );
}