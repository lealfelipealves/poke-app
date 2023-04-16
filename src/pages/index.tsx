import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { PokemonCardList } from "@/components/PokemonCardList";
import { PokemonProvider } from "@/context/PokemonContext";
import { ModalProvider } from "@/context/ModalContext";
import { RegionFilter } from "@/components/RegionFilter";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-start gap-4 bg-gradient-to-b from-[#ef5350] to-[#e53935] p-4">
      <PokemonProvider>
        <Header />
        <RegionFilter />
        <ModalProvider>
          <PokemonCardList />
          <Modal />
        </ModalProvider>
      </PokemonProvider>
    </main>
  );
}
