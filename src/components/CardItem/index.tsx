import Image from 'next/image'
import { Pokemon } from "pokenode-ts";

type CardItemProps = {
  pokemon: Pokemon;
}

export function CardItem({ pokemon }:CardItemProps) {
  return(
    <div className="flex flex-col w-full rounded-2xl items-center justify-center bg-white p-2 font-bold text-2xl">
      <Image src={pokemon.sprites.front_default} width={100} height={100} />
      <span>{pokemon.name}</span>
    </div>
  );
}