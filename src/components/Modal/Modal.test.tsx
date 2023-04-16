import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { usePokemonByNameQuery } from "@/hooks/usePokemonByNameQuery";

import { ModalContext } from '@/context/ModalContext'
import { PokemonContext } from '@/context/PokemonContext';
import { bulbasaur } from '@/mocks/bulbasaur'
import { Modal } from './index';


const mockUseQuery = useQuery as jest.Mock;

jest.mock('@tanstack/react-query', () => ({
  useQuery: mockUseQuery,
  useInfiniteQuery: jest.fn(),
}));

describe('Modal', () => {
  it('renders modal component', () => {
    const isOpen = true;
    const pokemon = bulbasaur;
    const setIsOpen = jest.fn();

    const client = new QueryClient();
    mockUseQuery.mockReturnValue({
      isLoading: false,
      data: bulbasaur,
    });

    /*(usePokemonByNameQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: bulbasaur,
    });*/

    const queryClient = new QueryClient();
    queryClient.setQueryData(['pokemon', 'bulbasaur'], bulbasaur);
  
    const Wrapper = ({ children }: any) => {
      return (
        <QueryClientProvider client={client}>
          <PokemonContext.Provider value={{ pokemon }}>
            <ModalContext.Provider value={{ isOpen, setIsOpen }}>
              {children}
            </ModalContext.Provider>
          </PokemonContext.Provider>
        </QueryClientProvider>
      );
    };

    const { debug } = render(<Modal />, { wrapper: Wrapper });
    
    debug();
  });
});