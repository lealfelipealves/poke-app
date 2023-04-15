import { useState } from 'react'
import { Header } from '@/components/Header'
import { Modal } from '@/components/Modal'
import { PokemonCardList } from '@/components/PokemonCardList'

export default function Home() {
  let [isOpen, setIsOpen] = useState(true)

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-start gap-4 bg-gradient-to-b from-[#ef5350] to-[#e53935] p-4">
      <Header />
      <PokemonCardList />
      <Modal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}  />
    </main>
  )
}
