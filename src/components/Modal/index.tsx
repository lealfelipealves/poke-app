import Image from "next/image";
import { Fragment, useEffect } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { usePokemon } from "@/context/PokemonContext";
import { useModal } from "@/context/ModalContext";
import { usePokemonByNameQuery } from "@/hooks/usePokemonByNameQuery";
import { Spinner } from "../Spinner";

export function Modal() {
  const { pokemon, setPokemon } = usePokemon();
  const { isOpen, setIsOpen } = useModal();

  const { isFetching: isFetchingPokemonByName, data: dataPokemonByName } =
    usePokemonByNameQuery(pokemon?.name || "bulbasaur");

  useEffect(() => {
    if (dataPokemonByName) {
      setPokemon?.(dataPokemonByName);
    }
  }, [dataPokemonByName, setPokemon]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full flex flex-col gap-4 max-w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {isFetchingPokemonByName ? (
                  <Spinner />
                ) : (
                  <>
                    <Dialog.Title
                      as="h2"
                      className="text-xl font-bold leading-8 text-gray-900 uppercase"
                    >
                      {pokemon?.name}
                    </Dialog.Title>

                    <div className="flex items-center justify-center gap-4">
                      <div className="min-w-min gap-4 flex flex-col justify-center items-center">
                        <Image
                          className="w-full h-full max-h-40"
                          src={pokemon?.sprites.front_default || ""}
                          width={96}
                          height={96}
                          alt={pokemon?.name || "pokemon"}
                          title={pokemon?.name}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="font-bold">Altura:</div>
                          <div>{pokemon?.height}m</div>
                          <div className="font-bold">Peso:</div>
                          <div>{pokemon?.weight}kg</div>
                        </div>
                      </div>
                      <div className="w-full">
                        {pokemon?.stats.map((stat, index) => (
                          <div key={index} className="grid grid-cols-3 gap-4">
                            <div className="flex items-center justify-end font-bold">
                              {stat.stat.name}
                            </div>
                            <div className="flex items-center justify-center text-center">
                              {stat.base_stat}
                            </div>
                            <div className="flex h-2 bg-gray-200 rounded-full">
                              <div
                                className={`h-full bg-red-500 rounded-full`}
                                style={{
                                  width: `${(stat.base_stat / 200) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
