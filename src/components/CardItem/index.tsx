import { Pokemon } from "@/services/hooks/usePokemon";

type CardItemProps = {
  pokemon: Pokemon;
}

export function CardItem({ pokemon }:CardItemProps) {
  return(
    <div className="flex w-full rounded-2xl items-center justify-center bg-white py-20 px-2 font-bold text-2xl">
      <span>{pokemon.name}</span>
    </div>
  );
}