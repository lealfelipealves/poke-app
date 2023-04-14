import Image from 'next/image'

export function Header() {
  return(
    <div className="flex max-w-screen-lg rounded-2xl items-center justify-between w-full bg-white p-4">
      <div className='flex'>
        <Image
          src="/images/pokeapi_256.png"
          alt="pokemon"
          width={100}
          height={24}
          priority
        />
      </div>

      <div className="flex flex-wrap justify-center">
        <input type='search' placeholder='Search' className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none' />
        <button type='button'>Filtrar</button>
      </div>
    </div>
  );
}