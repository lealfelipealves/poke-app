import { usePokemon } from "@/context/PokemonContext";
import { useModal } from "@/context/ModalContext";
import { NamedAPIResourceWithId } from "@/types";
import { Pokemon } from "pokenode-ts";

type PokemonCardItemProps = {
  pokemon: NamedAPIResourceWithId;
};

export function PokemonCardItem({ pokemon }: PokemonCardItemProps) {
  const { setPokemon, pokemon: pokemonData } = usePokemon();
  const { setIsOpen } = useModal();

  function handleOpenModal() {
    setIsOpen(true);
    setPokemon?.({
      ...pokemonData,
      name: pokemon.name,
    } as Pokemon);
  }

  return (
    <div
      data-testid="pokemon-card-item"
      className="flex flex-col w-full rounded-2xl items-start justify-center bg-white font-bold text-lg p-4 cursor-pointer"
      onClick={handleOpenModal}
    >
      <p>
        #{pokemon.id} - {pokemon.name}
      </p>
    </div>
  );
}
